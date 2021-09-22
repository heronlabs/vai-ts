#!/usr/bin/env bash

rm -rf build;

yarn compile;

files=$(find ./src -type f ! -name "*.ts")

for file in $files; do
  targetFile=$(echo $file | sed 's/src/build\/\src/g')
  targetFileFolder=$(echo "${targetFile%/*}")
  mkdir -p $targetFileFolder; cp $file $targetFile;
done;

# Move ts files without compiling them

## Jest
cp ./src/options/third-parties/jest/templates/jest.setup-file.ts ./build/src/options/third-parties/jest/templates/

## Skeleton
mkdir ./build/src/options/skeleton/templates/src
cp ./src/options/skeleton/templates/src/index.ts ./build/src/options/skeleton/templates/src/