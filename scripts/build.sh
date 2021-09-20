#!/usr/bin/env bash

rm -rf build;

yarn compile;

files=$(find ./src -type f ! -name "*.ts")

for file in $files; do
  targetFile=$(echo $file | sed 's/src/build\/\src/g')
  targetFileFolder=$(echo "${targetFile%/*}")
  mkdir -p $targetFileFolder; cp $file $targetFile;
done;
