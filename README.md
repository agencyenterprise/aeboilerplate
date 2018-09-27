# Krei
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> From Latin creō (“I create, make, produce”) +‎ -i. e.g.: I krei my full-stack application in seconds.

Krei is an opinionated boilerplate that creates a full-stack React/Node Typescript project. It includes independent client and API structures in the same repository, ready to run and deploy with a neat and tidy base.

There’s a lot of setup whenever you start a project. And it often gets repeated project to project.

We start a lot of projects at [AE Studio](https://ae.studio/), for startups and for big companies like Samsung and Berkshire Hathaway. So we decided to take the best stuff out there and put it together in one place to make our future projects kickoff faster. 

We’ve also scaled it down to make it simple to use for personal projects, and with a couple lines of code.

Krei is easy to use. 

*Krei includes*

* The basics of a React client and Node API with zero configuration and no complicated structure.
* [Github templates](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/).
* [Circle CI configuration](https://circleci.com/docs/2.0/configuration-reference/#section=configuration).
* Authentication using [PassportJS](http://www.passportjs.org/) and a social network [OAuth2](https://oauth.net/2/) strategy.
* Client
  * Created using [create-react-app](https://github.com/facebook/create-react-app) with [Typescript](https://www.typescriptlang.org/docs/home.html) and [SASS](https://sass-lang.com/).
  * Access to the API using [Axios](https://github.com/axios/axios).
  * [Redux](https://github.com/reduxjs/redux) using [ducks modular approach](https://github.com/erikras/ducks-modular-redux).
  * Private and protected routes with [React Router 4](https://reacttraining.com/react-router/core/guides/philosophy).
* API
  * [Express](https://expressjs.com/) with public and private routes structure.
  * Database access using [Knex](https://knexjs.org/)
      * [Migrations](https://knexjs.org/#Migrations-CLI) and [seeds](https://knexjs.org/#Seeds-CLI) included.
  * [Jest](https://jestjs.io/) for your tests.
* [Docker](https://docs.docker.com) and [docker compose](https://docs.docker.com/compose/) to run all of this in a controlled environment.

Krei also includes: [prettier](https://github.com/prettier/prettier), [editorconfig](https://editorconfig.org/), and [tslint](https://palantir.github.io/tslint/) to guarantee the consistency of your codebase.

## Before you start

Make sure you have installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node 8+](https://nodejs.org/en/)
- [Docker 18+](https://docs.docker.com/install/)
- [Docker Compose 1.21+](https://docs.docker.com/compose/install/)

## Creating a new project

Clone this project using the following command and changing the `PROJECT_NAME` placeholder: `git clone --depth=1 https://github.com/agencyenterprise/krei.git PROJECT_NAME`

```shell
npm run krei
```

This command creates a client and installs all the packages creating a full stack project structure ready to be developed.

## Running locally

*If you are running a cloned project originally made by krei for the first time, make sure you install all packages executing `npm run npm-i`.*

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

The authentication process uses [PassportJS](http://www.passportjs.org/) with the [Oauth2 framework](https://oauth.net/2/) to authenticate to Google and LinkedIn. In order to make it work, you are going to need:

### Google

* Go to [google developer site](https://console.developers.google.com).
* Create a new project.
* Enable Google+ API.
* Go to OAuth consent tab by clicking on the credentials item on the left menu, add a product name and any other data you want to have for your app.
* After saving it, you will be redirected to the credentials tab. Click on create credentials and OAuth client ID.
* Click on web application and set your web client name, your Authorized JavaScript origins as http://localhost:3001 and Authorized redirect URIs as http://localhost:3001/auth/google/callback.
* Click on create.
* You'll be redirected once again to the credentials tab with a popup showing your client id and client secret. Make sure you save both in your docker-compose files (meta and api)
    * GOOGLE_ID
    * GOOGLE_SECRET

### LinkedIn

- Create a new application in the [LinkedIn developer page](https://www.linkedin.com/developer/apps).
- Add your LinkedIn id and secret in the docker-compose.yml files (meta and api folders).
  - LINKEDIN_ID
  - LINKEDIN_SECRET
- Add the linkedin callback URL from your docker compose file in the LinkedIn developer app
  - LINKEDIN_CALLBACK_URL: http://localhost:3001/api/auth/linkedin/callback

## Deploying to heroku

1. Create a [Heroku](https://www.heroku.com/) account.
2. Install [heroku cli](https://www.npmjs.com/package/heroku) using npm
3. Run `heroku login` and fulfil with your login data.
4. Run `heroku create` to create a randomly named app or run `heroku create APP_NAME_HERE` to set a name to your application. Save your application url for further use.
5. Open your app in the [heroku apps dashboard](https://dashboard.heroku.com/apps), go to the resources tab and search for [postgres](https://elements.heroku.com/addons/heroku-postgresql) in the add-ons, select it and confirm clicking on "provision". It'll automatically create an [environment variable](https://devcenter.heroku.com/articles/config-vars) in your app called DATABASE_URL which means your app has now access to a database.
6. Open now the settings tab in your app dashboard, click on the reveal vars button in the Config Vars item and add the following variables with their respective values:

   - LINKEDIN_ID: client id created in the [LinkedIn developer page](https://www.linkedin.com/developer/apps)
   - LINKEDIN_SECRET: client secret created in the [LinkedIn developer page](https://www.linkedin.com/developer/apps)
   - LINKEDIN_CALLBACK_URL: for this variable, you must go back to the [LinkedIn developer page](https://www.linkedin.com/developer/apps) and add a URL using this pattern: https://url_from_heroku_create_command.herokuapp.com/api/auth/linkedin/callback.
     - To check what is the url created for your new app, go down in the Settings tab and look for the Domains and certificates item, your application url will be there.
   - SUCCESS_LOGIN_REDIRECT_URL: https://your_application_url.herokuapp.com/connect

7. Considering you haven't started your git repository, run: `git init && git add . && git commit -m "First commit"`
8. Run `git push heroku master` will deploy your project to heroku and make it available using the url
9. If you want to use a different Heroku app to deploy
   - Run `git remote remove heroku`
   - Run `git remote add heroku git@heroku.com:ANOTHER_HEROKU_APP_NAME.git`

## Setup Continuous integration with Circle CI and Heroku

1. Deploy your application to heroku following the steps above.
2. Change the placeholder `HEROKU_APP_NAME` in the `.circleci/config.yml` file with the name returned from your heroku application.
3. Sign up to [Circle CI](https://circleci.com/) using your git hub account which contains the project you want to integrate.
4. Click on the `add projects` tab item on the left menu and `Set Up Project` right beside the project you want to integrate.
5. Choose Linux as operating system, Node as language and click on the button for step 5, "Start building".
6. Click on the gear icon on the top right corner under your profile picture.
7. Click on `Checkout SSH keys` item on the left menu.
    * Click on `Authorize with GitHub` button.
    * Click on `Create and add YOUR_GIT_USER user key`.
8.  Go to your Heroku account and open your account settings clicking on your profile picture on the top right corner.
    * Scroll down and copy your API Key.
9.  Go back to your Circle CI application settings and click on `Heroku deployment` item on the left menu.
    * Add your Heroku API key copied before.
    * Click on `Set User to YOUR_GIT_USER` button.

## Running tests

```shell
npm run api-test-watch
```

It runs tests on watch mode for the API.
