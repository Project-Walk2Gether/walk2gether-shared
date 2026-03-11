#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SHARED_DIR="$SCRIPT_DIR"

# Consumer short names, directories, and static flags (parallel arrays)
ALL_NAMES=(    "functions"                               "expo"                               "admin"                                    "dashboard"                               "voice-agent"                               "website")
ALL_DIRS=(     "$SCRIPT_DIR/../walk2gether-functions"    "$SCRIPT_DIR/../walk2gether-expo"    "$SCRIPT_DIR/../walk2gether-admin-next"    "$SCRIPT_DIR/../walk2gether-dashboard"    "$SCRIPT_DIR/../walk2gether-voice-agent"    "$SCRIPT_DIR/../walk2gether-website")
ALL_STATIC=(   "false"                                   "false"                              "false"                                    "false"                                   "true"                                      "false")

get_dir_for_name() {
  local target="$1"
  for i in "${!ALL_NAMES[@]}"; do
    if [ "${ALL_NAMES[$i]}" = "$target" ]; then
      echo "${ALL_DIRS[$i]}"
      return 0
    fi
  done
  return 1
}

get_static_for_name() {
  local target="$1"
  for i in "${!ALL_NAMES[@]}"; do
    if [ "${ALL_NAMES[$i]}" = "$target" ]; then
      echo "${ALL_STATIC[$i]}"
      return 0
    fi
  done
  echo "false"
}

# Parse --only argument (comma-separated list of short names)
ONLY_CONSUMERS=()
for arg in "$@"; do
  case "$arg" in
    --only=*)
      IFS=',' read -ra ONLY_CONSUMERS <<< "${arg#--only=}"
      ;;
    --help|-h)
      echo "Usage: ./pack-and-update.sh [--only=name1,name2,...]"
      echo ""
      echo "Consumer names: ${ALL_NAMES[*]}"
      echo ""
      echo "Examples:"
      echo "  ./pack-and-update.sh                        # update all consumers"
      echo "  ./pack-and-update.sh --only=functions        # update only functions"
      echo "  ./pack-and-update.sh --only=functions,expo   # update functions and expo"
      exit 0
      ;;
  esac
done

# Determine which consumers to target
if [ ${#ONLY_CONSUMERS[@]} -gt 0 ]; then
  TARGET_NAMES=("${ONLY_CONSUMERS[@]}")
  for name in "${TARGET_NAMES[@]}"; do
    if ! get_dir_for_name "$name" > /dev/null 2>&1; then
      echo "❌ Unknown consumer: $name"
      echo "   Valid names: ${ALL_NAMES[*]}"
      exit 1
    fi
  done
  echo "==> Targeting only: ${TARGET_NAMES[*]}"
else
  TARGET_NAMES=("${ALL_NAMES[@]}")
fi

# Generate a timestamp-based prerelease version to bust npm cache
TIMESTAMP=$(date +%s)
VERSION="1.0.0-${TIMESTAMP}"
TARBALL_NAME="walk2gether-shared-${VERSION}.tgz"

echo "==> Setting walk2gether-shared version to ${VERSION}"
cd "$SHARED_DIR"
npm version "$VERSION" --no-git-tag-version --allow-same-version

echo "==> Building walk2gether-shared"
npm run build

# Pack to each target consumer directory
for name in "${TARGET_NAMES[@]}"; do
  DIR=$(get_dir_for_name "$name")
  if [ -d "$DIR" ]; then
    echo "==> Packing to ${name}"
    npm pack --pack-destination "$DIR"
  fi
done

update_consumer() {
  local DIR="$1"
  local NAME="$2"
  local USE_STATIC="${3:-false}"

  if [ ! -d "$DIR" ]; then
    echo "==> Skipping ${NAME} (directory not found)"
    return
  fi

  echo "==> Updating ${NAME}"

  # Remove old tarballs (but not the new one or the static copy)
  find "$DIR" -maxdepth 1 -name "walk2gether-shared-*.tgz" ! -name "$TARBALL_NAME" -delete

  if [ "$USE_STATIC" = "true" ]; then
    # Dockerized consumers: use static name walk2gether-shared.tgz
    cp "$DIR/$TARBALL_NAME" "$DIR/walk2gether-shared.tgz"
    if [[ "$(uname)" == "Darwin" ]]; then
      sed -i '' "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"file:walk2gether-shared.tgz\"|" "$DIR/package.json"
    else
      sed -i "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"file:walk2gether-shared.tgz\"|" "$DIR/package.json"
    fi
  else
    # Non-Dockerized consumers: use dynamic name for cache busting
    if [[ "$(uname)" == "Darwin" ]]; then
      sed -i '' "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"file:${TARBALL_NAME}\"|" "$DIR/package.json"
    else
      sed -i "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"file:${TARBALL_NAME}\"|" "$DIR/package.json"
    fi
  fi

  echo "==> Cleaning npm cache and reinstalling in ${NAME}"
  cd "$DIR"
  npm cache clean --force
  rm -rf node_modules/walk2gether-shared package-lock.json
  npm install

  # npm install rewrites package.json with resolved parent-relative paths for file: deps.
  # Re-apply the correct local path after install.
  if [ "$USE_STATIC" = "true" ]; then
    local FINAL_REF="file:walk2gether-shared.tgz"
  else
    local FINAL_REF="file:${TARBALL_NAME}"
  fi
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"${FINAL_REF}\"|" "$DIR/package.json"
  else
    sed -i "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"${FINAL_REF}\"|" "$DIR/package.json"
  fi
}

for name in "${TARGET_NAMES[@]}"; do
  DIR=$(get_dir_for_name "$name")
  USE_STATIC=$(get_static_for_name "$name")
  update_consumer "$DIR" "$name" "$USE_STATIC"
done

echo ""
echo "✅ walk2gether-shared ${VERSION} installed in: ${TARGET_NAMES[*]}"
