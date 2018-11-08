- [Boilerplate structure](#boilerplate-structure)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
  - [Authentication](#authentication)
    - [Configuring Google Authentication](#configuring-google-authentication)
    - [Configuring LinkedIn Authentication](#configuring-linkedin-authentication)
  - [Deploy](#deploy)
    - [Deploying to heroku](#deploying-to-heroku)
  - [Continuous Integration](#continuous-integration)
    - [Setup Continuous integration with Circle CI and Heroku](#setup-continuous-integration-with-circle-ci-and-heroku)

# Boilerplate structure

* Client
  * Created using [create-react-app](https://github.com/facebook/create-react-app) with [Typescript](https://www.typescriptlang.org/docs/home.html) and [SASS](https://sass-lang.com/).
  * Access to the API using [Axios](https://github.com/axios/axios).
  * [Redux](https://github.com/reduxjs/redux) using [ducks modular approach](https://github.com/erikras/ducks-modular-redux).
  * Public and private routes samples with [React Router 4](https://reacttraining.com/react-router/core/guides/philosophy).
  * [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme) for tests.
* API
  * [Express](https://expressjs.com/) with public and private routes samples.
  * [Postgres](https://www.postgresql.org/about/) database access using [Knex](https://knexjs.org/)
      * [Migrations](https://knexjs.org/#Migrations-CLI) and [seeds](https://knexjs.org/#Seeds-CLI) included.
  * [Jest](https://jestjs.io/) for tests.
* [Circle CI configuration](https://circleci.com/docs/2.0/configuration-reference/#section=configuration).
* Authentication using [PassportJS](http://www.passportjs.org/) and social network [OAuth2](https://oauth.net/2/) strategy.
* [Docker](https://docs.docker.com) and [docker compose](https://docs.docker.com/compose/) to run all of this in a controlled environment.
* In order to guarantee the consistency of your codebase it includes: [prettier](https://github.com/prettier/prettier), [editorconfig](https://editorconfig.org/), and [tslint](https://palantir.github.io/tslint/).
* [Github templates](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/).

# Available scripts

In order to list all scripts available when using the boilerplate run:

```shell
npm run
```

# Configuration

Learn how to configure authentication using OAuth2, deploy and Circle CI

The API and Client have both the same structure of configuration files. You can find these files on: `api/src/config` and `client/src/config`. The configuration is based on environment variables set using the docker-compose file when running the project in development mode.

## Authentication

### Configuring Google Authentication

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

### Configuring LinkedIn Authentication

- Create a new application in the [LinkedIn developer page](https://www.linkedin.com/developer/apps).
- Add your LinkedIn id and secret in the docker-compose.yml files (meta and api folders).
  - LINKEDIN_ID
  - LINKEDIN_SECRET
- Add the linkedin callback URL from your docker compose file in the LinkedIn developer app
  - LINKEDIN_CALLBACK_URL: http://localhost:3001/api/auth/linkedin/callback

## Deploy

We use Heroku as our cloud service at AE for its simplicity and here is how we do it.

### Deploying to heroku

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

## Continuous Integration

Setup a continuous integration process to have your code deployed to the cloud when you push it to the master branch. Following the step before regarding Heroku, we are going to use Circle CI as our continuous integration platform.

### Setup Continuous integration with Circle CI and Heroku

1. Deploy your application to heroku following the steps above.
2. Remove comments from the deploy step in the circle ci configuration file: `.circleci/config.yml`
3. Change the placeholder `HEROKU_APP_NAME` in the `.circleci/deploy-heroku.sh` file with the name returned from your heroku application.
4. Sign up to [Circle CI](https://circleci.com/) using your git hub account which contains the project you want to integrate.
5. Click on the `add projects` tab item on the left menu and `Set Up Project` right beside the project you want to integrate.
6. Choose Linux as operating system, Node as language and click on the button for step 5, "Start building".
7. Click on the gear icon on the top right corner under your profile picture.
8. Click on `Checkout SSH keys` item on the left menu.
    * Click on `Authorize with GitHub` button.
    * Click on `Create and add YOUR_GIT_USER user key`.
9.  Go to your Heroku account and open your account settings clicking on your profile picture on the top right corner.
    * Scroll down and copy your API Key.
10. Go back to your Circle CI application settings and click on `Heroku deployment` item on the left menu.
    * Add your Heroku API key copied before.
    * Click on `Set User to YOUR_GIT_USER` button.
