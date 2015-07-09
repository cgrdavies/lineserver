#!/bin/bash
# Installs dependencies; Assumes Node.js and npm are available. 

echo "Please note: the server expects an absolute path to the file provided in your script argument."
echo "Using file - $1"
npm start $1