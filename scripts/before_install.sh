#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
      . ~/.nvm/nvm.sh
#uninstall latest vesrion node and npm while they are not stable
nvm uninstall v18.9.0
#download latest stable vesrion
nvm install --lts
nvm use --lts
node -e "console.log('Running Node.js ' + process.version)"
#create our working directory if it doesnt exist
DIR="/home/ec2-user/express-app"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi 