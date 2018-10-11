#!/bin/bash

DIR="snapshots/app/public/"

#building component
npm run build

# verify if images directory exists
if [ -d "snapshots/images" ]
then
    rm -r snapshots/images/
fi

# verify if public directory is empty
if [ "$(ls -A $DIR)" ] 
then
    rm snapshots/app/public/*
fi

#copying demo/dist
cp demo/dist/* snapshots/app/public/

# generating snaps
npm run snaps