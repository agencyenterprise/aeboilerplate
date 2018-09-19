![Logo of the project](https://ae.studio/assets/images/aestudio-logo-light.svg)

# Krei

> From Latin creō (“I create, make, produce”) +‎ -i.

Krei a project ready to run and deploy with react/redux and a node API in just one step... and it's clean code!

## Before you start

Make sure you have installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node 8+](https://nodejs.org/en/)
- [Docker 18+](https://docs.docker.com/install/)
- [Docker Compose 1.21+](https://docs.docker.com/compose/install/)

## Creating a new project

```shell
npm run krei
```

This command creates a client and installs all the packages creating a full stack project structure ready to be developed.

## Running locally

The authentication process uses [PassportJS](http://www.passportjs.org/) with the [Oauth2 framework](https://oauth.net/2/) to authenticate to LinkedIn. In order to make it work, you are going to need:

- A new application in the [LinkedIn developer page].(https://www.linkedin.com/developer/apps)
- Add your LinkedIn id and secret in the docker-compose.yml files (meta and api folders).
  - LINKEDIN_ID
  - LINKEDIN_SECRET
- Add the linkedin callback URL from your docker compose file in the LinkedIn developer app
  - LINKEDIN_CALLBACK_URL: http://localhost:3001/api/auth/linkedin/callback

```shell
npm run dev
```

It starts an API, database and client containers using docker compose. The default configuration provides the following environment:

- API: http://localhost:3001/api
- Client: http://localhost:3000
- Database:
  - host: localhost
  - port: 5432
  - user: user
  - password: password
  - database: api-db

## Deploying to heroku

1. Create a [Heroku](https://www.heroku.com/) account.
2. Install [heroku cli](https://www.npmjs.com/package/heroku) using npm
3. Run `heroku login` and fulfill with your login data.
4. Run `heroku create` to create a random named app or run `heroku create APP_NAME_HERE` to set a name to your application. Save your application url for further use.
5. Open your app in the [heroku apps dashboard](https://dashboard.heroku.com/apps), go to the resources tab and search for [postgres](https://elements.heroku.com/addons/heroku-postgresql) in the add-ons, select it and confirm clicking on provision. It'll automatically create an [environment variable](https://devcenter.heroku.com/articles/config-vars) in your app called DATABASE_URL which means your app has now access to a database. You don't need to worry about your krei project configuration as it's already prepared to use the DATABASE_URL environment variable.
6. Open now the settings tab in your app dashboard, click on the reveal vars button in the Config Vars item and add the following variables with their respective values:

   - LINKEDIN_ID: client id created in the [LinkedIn developer page](https://www.linkedin.com/developer/apps)
   - LINKEDIN_SECRET: client secret created in the [LinkedIn developer page](https://www.linkedin.com/developer/apps)
   - LINKEDIN_CALLBACK_URL: for this variable you must go back to the [LinkedIn developer page](https://www.linkedin.com/developer/apps) and add a URL using this pattern: https://url_from_heroku_create_command.herokuapp.com/api/auth/linkedin/callback.
     - To check what is the url created for your new app, go down in the Settings tab and look for the Domains and certificates item, your application url will be there.
   - SUCCESS_LOGIN_REDIRECT_URL: https://your_application_url.herokuapp.com/connect

7. Considering you haven't started your git repository, run: `git init && git add . && git commit -m "First commit"`
8. Run `git push heroku master` will deploy your project to heroku and make it available using the url
