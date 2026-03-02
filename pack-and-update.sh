#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SHARED_DIR="$SCRIPT_DIR"
FUNCTIONS_DIR="$SCRIPT_DIR/../walk2gether-functions"
EXPO_DIR="$SCRIPT_DIR/../walk2gether-expo"
ADMIN_DIR="$SCRIPT_DIR/../walk2gether-admin-next"
DASHBOARD_DIR="$SCRIPT_DIR/../walk2gether-dashboard"
VOICE_AGENT_DIR="$SCRIPT_DIR/../walk2gether-voice-agent"

# Generate a timestamp-based prerelease version to bust npm cache
TIMESTAMP=$(date +%s)
VERSION="1.0.0-${TIMESTAMP}"
TARBALL_NAME="walk2gether-shared-${VERSION}.tgz"

echo "==> Setting walk2gether-shared version to ${VERSION}"
cd "$SHARED_DIR"
npm version "$VERSION" --no-git-tag-version --allow-same-version

echo "==> Building walk2gether-shared"
npm run build

# Pack to each consumer directory
CONSUMERS=("$FUNCTIONS_DIR" "$EXPO_DIR" "$ADMIN_DIR" "$DASHBOARD_DIR" "$VOICE_AGENT_DIR")
for DIR in "${CONSUMERS[@]}"; do
  if [ -d "$DIR" ]; then
    echo "==> Packing to $(basename "$DIR")"
    npm pack --pack-destination "$DIR"
  fi
done

update_consumer() {
  local DIR="$1"
  local NAME=$(basename "$DIR")
  local USE_STATIC="${2:-false}"

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
      sed -i '' "s|\"walk2gether-shared\": \"file:[^\"]*\"|\"walk2gether-shared\": \"file:walk2gether-shared.tgz\"|" "$DIR/package.json"
    else
      sed -i "s|\"walk2gether-shared\": \"file:[^\"]*\"|\"walk2gether-shared\": \"file:walk2gether-shared.tgz\"|" "$DIR/package.json"
    fi
  else
    # Non-Dockerized consumers: use dynamic name for cache busting
    if [[ "$(uname)" == "Darwin" ]]; then
      sed -i '' "s|\"walk2gether-shared\": \"file:[^\"]*\"|\"walk2gether-shared\": \"file:${TARBALL_NAME}\"|" "$DIR/package.json"
    else
      sed -i "s|\"walk2gether-shared\": \"file:[^\"]*\"|\"walk2gether-shared\": \"file:${TARBALL_NAME}\"|" "$DIR/package.json"
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
    sed -i '' "s|\"walk2gether-shared\": \"file:[^\"]*\"|\"walk2gether-shared\": \"${FINAL_REF}\"|" "$DIR/package.json"
  else
    sed -i "s|\"walk2gether-shared\": \"file:[^\"]*\"|\"walk2gether-shared\": \"${FINAL_REF}\"|" "$DIR/package.json"
  fi
}

update_consumer "$FUNCTIONS_DIR"
update_consumer "$EXPO_DIR"
update_consumer "$ADMIN_DIR"
update_consumer "$DASHBOARD_DIR"
update_consumer "$VOICE_AGENT_DIR" true

echo ""
echo "✅ walk2gether-shared ${VERSION} installed in all consumer projects"
