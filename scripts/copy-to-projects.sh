echo "Copying lib directory to projects"

rm -rf ../walk2gether-functions/node_modules/walk2gether-shared/lib
rm -rf ../walk2gether-expo/node_modules/walk2gether-shared/lib

mkdir -p ../walk2gether-functions/node_modules/walk2gether-shared/lib
mkdir -p ../walk2gether-expo/node_modules/walk2gether-shared/lib

cp -R lib/* ../walk2gether-functions/node_modules/walk2gether-shared/lib
cp -R lib/* ../walk2gether-expo/node_modules/walk2gether-shared/lib

echo "Copying complete"
