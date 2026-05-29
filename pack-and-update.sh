#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SHARED_DIR="$SCRIPT_DIR"

# Consumer short names and directories (parallel arrays)
ALL_NAMES=(    "functions"                               "expo"                               "admin"                                    "dashboard"                               "voice-agent"                               "website")
ALL_DIRS=(     "$SCRIPT_DIR/../walk2gether-functions"    "$SCRIPT_DIR/../walk2gether-expo"    "$SCRIPT_DIR/../walk2gether-admin-next"    "$SCRIPT_DIR/../walk2gether-dashboard"    "$SCRIPT_DIR/../walk2gether-voice-agent"    "$SCRIPT_DIR/../walk2gether-website")

# Every consumer references the shared package under this single, stable filename.
# Only this file is tracked in git (see each consumer's .gitignore); the npm version
# bump below busts npm's cache, and we force a clean reinstall, so a stable filename
# is enough — no per-build timestamped tarballs to accumulate.
TARBALL_STATIC="walk2gether-shared.tgz"

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

# Generate a timestamp-based prerelease version to bust npm's cache on every run.
TIMESTAMP=$(date +%s)
VERSION="1.0.0-${TIMESTAMP}"
TARBALL_NAME="walk2gether-shared-${VERSION}.tgz"

echo "==> Setting walk2gether-shared version to ${VERSION}"
cd "$SHARED_DIR"
npm version "$VERSION" --no-git-tag-version --allow-same-version

echo "==> Building walk2gether-shared"
npm run build

# Set the package.json "walk2gether-shared" ref to the static tarball.
set_consumer_ref() {
  local DIR="$1"
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"file:${TARBALL_STATIC}\"|" "$DIR/package.json"
  else
    sed -i "s|\"walk2gether-shared\": \"[^\"]*\"|\"walk2gether-shared\": \"file:${TARBALL_STATIC}\"|" "$DIR/package.json"
  fi
}

# Pack + install for a single consumer. This is atomic per consumer: if the run is
# interrupted, each consumer is either fully updated or untouched — never left with a
# stray tarball and a stale package.json ref (the old two-loop approach could do that).
update_consumer() {
  local DIR="$1"
  local NAME="$2"

  if [ ! -d "$DIR" ]; then
    echo "==> Skipping ${NAME} (directory not found)"
    return
  fi

  echo "==> Packing + updating ${NAME}"

  # Pack a fresh tarball into the consumer dir (npm names it by version).
  cd "$SHARED_DIR"
  npm pack --pack-destination "$DIR"

  # Adopt the stable filename and remove any timestamped tarballs left by older runs.
  mv -f "$DIR/$TARBALL_NAME" "$DIR/$TARBALL_STATIC"
  find "$DIR" -maxdepth 1 -name "walk2gether-shared-*.tgz" -delete

  set_consumer_ref "$DIR"

  # No global `npm cache clean` needed: the version bump above means every run installs
  # a brand-new version, so npm never serves a stale same-version tarball from cache.
  echo "==> Reinstalling in ${NAME}"
  cd "$DIR"
  rm -rf node_modules/walk2gether-shared package-lock.json
  npm install

  # npm install rewrites package.json with resolved parent-relative paths for file: deps.
  # Re-apply the correct local path after install.
  set_consumer_ref "$DIR"
}

for name in "${TARGET_NAMES[@]}"; do
  DIR=$(get_dir_for_name "$name")
  update_consumer "$DIR" "$name"
done

echo ""
echo "✅ walk2gether-shared ${VERSION} installed in: ${TARGET_NAMES[*]}"
