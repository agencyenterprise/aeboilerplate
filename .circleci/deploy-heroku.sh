echo "Deploy master"

git remote add heroku $1
git show --summary
git push -f heroku master
