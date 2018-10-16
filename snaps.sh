#!/bin/bash

set -o errexit

DIR="snapshots/public/"

# building component
npm run build

# verify if images directory exists
if [ -d "snapshots/images" ]
then
    rm -r snapshots/images/
fi

mkdir -p snapshots/public

# verify if public directory is empty
if [ "$(ls -A $DIR)" ] 
then
    rm snapshots/public/*
fi

# copying demo/dist
cp demo/dist/* snapshots/public/

# generating snaps
npm run snaps