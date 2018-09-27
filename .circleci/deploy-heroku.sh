
echo "[1/5] Add heroku ssh to known hosts"
ssh-keyscan heroku.com >> ~/.ssh/known_hosts

echo "[2/5] Show available repositories"
git remote -v

echo "[3/5] Install global NPM"
sudo npm i -g npm

echo "[4/5] Add heroku app"
git remote add heroku git@heroku.com:HEROKU_APP_NAME.git

echo "[5/5] Deploy to heroku"
git push -f heroku master
