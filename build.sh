#!/bin/bash

echo "-------------------------------------------------"
echo "How to call: ./build.sh NAME PORT [install]"
echo "-------------------------------------------------"
cd /home/$1
if [ "$3" = "install" ]
then
  npm i
fi

source activate $1
pm2 delete $1
API_PORT=$2 pm2 start ./index.js --name "$1"
source deactivate
