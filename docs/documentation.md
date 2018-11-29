# Table of Contents

**AEBoilerplate** is a full-stack React/Node/Typescript web project starter that focuses primarily on ease-of-use and simplicity.

- [Boilerplate structure](#boilerplate-structure)
- [Development](#development)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
  - [Authentication](#authentication)
    - [Google](#google)
    - [Facebook](#facebook)
    - [LinkedIn](#linkedin)
    - [Adding other authentication methods](#adding-other-authentication-methods)
    - [Protecting your routes](#protecting-your-routes)
  - [Deployment](#deployment)
    - [Setting up your Heroku application](#setting-up-your-heroku-application)
    - [Deploying to Heroku](#deploying-to-heroku)
  - [Continuous integration](#continuous-integration)
    - [Setting up continuous integration with Circle CI and Heroku](#setting-up-continuous-integration-with-circle-ci-and-heroku)
- [Testing](#testing)

# Boilerplate structure

The boilerplate is divided into two independent applications - the client and API. As the boilerplate is _not_ a monolithic application, the client and API can be separated into their own repositories.

The client application is generated using `create-react-app` and the API is built on top of Node and Express with a Postgres database.

Both applications come preconfigured with Docker and Docker Compose for running the applications locally in self-contained environments.

Here is a basic overview of the structure and technologies used:

- Client
  - Generated using [create-react-app](https://github.com/facebook/create-react-app) with [Typescript](https://www.typescriptlang.org/docs/home.html) and [SASS](https://sass-lang.com/).
  - [Axios](https://github.com/axios/axios) for the HTTP client.
  - [Redux](https://github.com/reduxjs/redux) using the [ducks modular approach](https://github.com/erikras/ducks-modular-redux) for state management.
  - [React Router 4](https://reacttraining.com/react-router/core/guides/philosophy) for routing. \* [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme) for testing.
- API
  - [Express](https://expressjs.com/) for routing.
  - [Postgres](https://www.postgresql.org/about/) database and [Knex](https://knexjs.org/) for query building. [Migrations](https://knexjs.org/#Migrations-CLI) and [seeds](https://knexjs.org/#Seeds-CLI) are included. \* [Jest](https://jestjs.io/) for testing.
- [Circle CI configuration](https://circleci.com/docs/2.0/configuration-reference/#section=configuration) for continuous integration.
- [PassportJS](http://www.passportjs.org/) and [OAuth2](https://oauth.net/2/) for authentication.
- [Docker](https://docs.docker.com) and [docker compose](https://docs.docker.com/compose/) for running applications locally.
- [prettier](https://github.com/prettier/prettier), [editorconfig](https://editorconfig.org/), and [tslint](https://palantir.github.io/tslint/) for consistent code formatting.
- [Github templates](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/) for Github pull request templates.

# Development

The boilerplate comes packaged with a docker-compose file preconfigured for hot-reloading.

```shell
npm run dev
```

Running the command above in the root directory starts Docker-ized instances of the client, API, and database.

# Available scripts

To see all available npm scripts, run:

```shell
npm run
```

# Configuration

The API and client configuration files share the same structure and can be found in their respective `/src/config` folders. In a development environment, values are referenced inside the docker-compose configuration files.

## Authentication

### Google

- Create a new project from your [Google developer page](https://console.developers.google.com).
- After creating your project you are redirected to the project Dashboard. Enable Google+ API by clicking on the _Library_ link on the left menu and searching for Google+ API or _ENABLE APIS AND SERVICES_ on the dashboard screen.
- Go to the OAuth consent tab by clicking on the credentials link on the left menu. Click on _CREATE CREDENTIAL_:
  - Which API are you using?
    - Google+ API
  - Where will you be calling the API from?
    - Web server (e.g. node.js, Tomcat)
  - What data will you be accessing?
    - User data
- After adding this information click on _What credentials do I need?_
- It'll open the second step to create an OAuth 2.0 client ID:
  - `Name` : your application name
  - `Authorized JavaScript Origins`: `http://localhost:3001`
  - `Authorized Redirect URIs`: `http://localhost:3001/auth/google/callback`
- Click on _Create OAuth client ID_.
- The third step will open for the consent screen configuration where you need to set your product name. Click on continue after setting the product name.
- In the last step, click on Done. You will be able to copy the client id on the next screen.
- Click on your project name. Copy the Client ID and Client Secret to `GOOGLE_ID` and `GOOGLE_SECRET` in both the root level and API docker-compose configuration files.

### Facebook

- Create a new [Facebook developer](https://developers.facebook.com) account.
- Click on My Apps and add a new app.
- Set a _display name_ and your _contact email_.
- Click on the _Set Up_ button under the _Facebook Login_ card on the main dashboard.
- Go to _Valid OAuth Redirect URIs_ and add `http://localhost:3001/api/auth/facebook/callback`.
- Click on _Save Changes_
- Copy the _client id_ and _client secret_ from the left menu opening the _Settings_ item and clicking on _Basic_
- Set these values to `FACEBOOK_ID` and `FACEBOOK_SECRET` in both the root level and API docker-compose configuration files.

### LinkedIn

- Create a new application from your [LinkedIn developer page](https://www.linkedin.com/developer/apps).
- Set your `LINKEDIN_ID` and `LINKEDIN_SECRET` in both the root level and API docker-compose configuration files.
- Set the `LINKEDIN_CALLBACK_URL` to `http://localhost:3001/api/auth/linkedin/callback` inside your LinkedIn application settings.

### Adding other authentication methods

While the boilerplate’s API was built to use Google, Facebook and LinkedIn’s authentication strategies, it is also easy to integrate other strategies.

First, read the [PassportJS documentation](http://www.passportjs.org/packages/). Then, make the following changes:

The authentication process is using the boilerplate API and it should be easy to add other strategies changing the following files:

- [passport-initializer](https://github.com/agencyenterprise/aeboilerplate/blob/master/api/src/config/passport-initializer.ts)
  - Update the configuration file with API keys and other configurations required for your strategy.
  - Update the `initializePassport` function to in initialize your new strategy.
- [authenticate.ts](https://github.com/agencyenterprise/aeboilerplate/blob/master/api/src/api/authentication/authenticate.ts) (contains routing for your new strategy)
  - Add routes for your service.
  - Note: when following [O Auth2](https://oauth.net/2/)’s authentication pattern, two paths are required - one for the initial authenticate call and another for the callback. Make sure to use the same name that was set in the passport-initializer file, e.g. `passport.authenticate('facebookProvider')`.

Once everything has been configured, the boilerplate should automatically persist user authentication data to the database and save the token in the local storage.

### Protecting your routes

If you want to create a new protected route follow these steps:

**API**

Add the `ensureAuthenticated` middleware when creating your route, e.g.

```js
router.use('/', asyncHandler(ensureAuthenticated), (_, res) => res.send('AUTHENTICATED').status(200))
```

The [`asyncHandler`](https://github.com/Abazhenov/express-async-handler) is a simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

**Client**

Add your route to `ProtectedRoutes.tsx`.

## Deployment

The boilerplate can be deployed in any cloud service provider of your choice. For simplicity and ease-of-use, we use Heroku as our cloud service.

### Setting up your Heroku application

Prerequisites:

- [Heroku cli](https://www.npmjs.com/package/heroku)
- [Heroku](https://www.heroku.com/) account
- This boilerplate relies on an authentication process to work properly. Make sure you have been through the [authentication configuration](#authentication).

1. In your project directory, run `heroku login` and enter your credentials.
2. Run `heroku create APP_NAME` to create your Heroku application. Copy your application URL for later steps.
3. Navigate to your application in the [heroku apps dashboard](https://dashboard.heroku.com/apps) and go to the Resources tab. Under Add-ons, add a [postgres](https://elements.heroku.com/addons/heroku-postgresql) database by searching for postgres in the search field. A `DATABASE_URL` [configuration variable](https://devcenter.heroku.com/articles/config-vars) is generated upon creation.
4. Navigate to your application's Settings tab in your heroku dashboard. Click on Reveal Vars and set the following values:
   - `GOOGLE_ID`: the client ID for your application's
   - `GOOGLE_SECRET`: the client secret for your Google app
   - `GOOGLE_CALLBACK_URL`: `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/google/callback` using the URL from step 2.
     - If you missed your application URL on step two, go down in the Settings tab and look for the Domains and certificates item.
   - `SUCCESS_LOGIN_REDIRECT_URL`: `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/connect`

### Deploying to Heroku

Deploy your application to Heroku by running:

```shell
git push heroku master
```

## Continuous integration

The boilerplate uses CircleCI for automated deployment to Heroku when pushing to your Github master branch.

### Setting up continuous integration with Circle CI and Heroku

Prerequisites:

- Heroku application has been set up ([Setting up your Heroku application](#setting-up-your-heroku-application))
- a [Circle CI](https://circleci.com/) account linked to your GitHub account hosting your project's repository

1. Uncomment the deploy step inside `.circleci/config.yml`.
2. Replace the placeholder `HEROKU_APP_NAME` inside `.circleci/deploy-heroku.sh` with your Heroku application name.
3. Navigate to the Add Projects tab and click on Set Up Project for your project.
4. Select Linux as the operating system and Node as language. Then start building the project to launch the project on CircleCI.
5. Settings > Projects > Go to your followed project and select the gear icon
6. Navigate to Checkout SSH Keys under Permissions in the left menu pane. Authorize your Github to add create a user key for your account.
7. Navigate to Heroku Deployment under Continuous Deployment and enter your Heroku API key, which can be found in your Heroku account settings. Then, set the user to your Heroku account.

# Testing

The boilerplate comes with tests for both the API and client. We highly encourage you to maintain them during development.

You can find API tests in the `api/spec` folder and the client tests inside each React components folder.

**To run client-side tests,**

```shell
npm run client-test
```

**To run server-side tests,**

```shell
npm run api-test-watch
```
