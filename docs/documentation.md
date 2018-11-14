# Table of Contents

- [Boilerplate structure](#boilerplate-structure)
- [Development mode](#development-mode)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
  - [Authentication](#authentication)
    - [Configuring Google Authentication](#configuring-google-authentication)
    - [Configuring LinkedIn Authentication](#configuring-linkedin-authentication)
    - [Adding other authentication methods](#adding-other-authentication-methods)
    - [Protecting your routes](#protecting-your-routes)
  - [Deployment](#deployment)
    - [Setting up your Heroku application](#setting-up-your-heroku-application)
    - [Deploying to Heroku](#deploying-to-heroku)
  - [Continuous integration](#continuous-integration)
    - [Setting up continuous integration with Circle CI and Heroku](#setting-up-continuous-integration-with-circle-ci-and-heroku)
- [Testing](#testing)


# Boilerplate structure

The boilerplate is divided into two independent applications - the client and API. As the boilerplate is *not* a monolithic application, the client and API can be separated into their own repositories.

The client application is generated using `create-react-app` and the API is built on top of Node and Express with a Postgres database. 

Both applications come preconfigured with Docker and Docker Compose for running the applications locally in self-contained environments.

Here is a basic overview of the structure and technologies used:

* Client
	* Generated using [create-react-app](https://github.com/facebook/create-react-app) with [Typescript](https://www.typescriptlang.org/docs/home.html) and [SASS](https://sass-lang.com/).
	* [Axios](https://github.com/axios/axios) for the HTTP client.
	* [Redux](https://github.com/reduxjs/redux) using the [ducks modular approach](https://github.com/erikras/ducks-modular-redux) for state management.
	* [React Router 4](https://reacttraining.com/react-router/core/guides/philosophy) for routing.
	* [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme) for testing.
* API
	* [Express](https://expressjs.com/) for routing.
	* [Postgres](https://www.postgresql.org/about/) database and [Knex](https://knexjs.org/) for query building. [Migrations](https://knexjs.org/#Migrations-CLI) and [seeds](https://knexjs.org/#Seeds-CLI) are included.
	* [Jest](https://jestjs.io/) for testing.
* [Circle CI configuration](https://circleci.com/docs/2.0/configuration-reference/#section=configuration) for continuous integration.
* [PassportJS](http://www.passportjs.org/) and [OAuth2](https://oauth.net/2/) for authentication. 
* [Docker](https://docs.docker.com) and [docker compose](https://docs.docker.com/compose/) for running applications locally.
* [prettier](https://github.com/prettier/prettier), [editorconfig](https://editorconfig.org/), and [tslint](https://palantir.github.io/tslint/) for consistent code formatting.
* [Github templates](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/) for Github pull request templates.


#  Development
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

### Configuring Google Authentication

* Create a new project from your [Google developer page](https://console.developers.google.com).
* Enable Google+ API.
* Go to the OAuth consent tab by clicking on the credentials link on the left menu and add a product, along with any other data you want set for your project.
* After saving, you will be redirected to the Credentials tab. Click on Create Credentials and enter your OAuth Client ID.
* Click on Web Application and set the following values:
	* `Web Client Name` : your application name
	* `Authorized JavaScript Origins`:  `http://localhost:3001`
	* `Authorized Redirect URIs`: `http://localhost:3001/auth/google/callback`
* Click on Create.
* You will be redirected back to the Credentials tab with a popup displaying your Client ID and Secret. Set these values to `GOOGLE_ID` and `GOOGLE_SECRET` in both the root level and API docker-compose configuration files.

### Configuring LinkedIn Authentication

* Create a new application from your [LinkedIn developer page](https://www.linkedin.com/developer/apps).
* Set your `LINKEDIN_ID` and `LINKEDIN_SECRET` in both the root level and API docker-compose configuration files.
* Set the `LINKEDIN_CALLBACK_URL` to `http://localhost:3001/api/auth/linkedin/callback`  inside your LinkedIn application settings.

### Adding other authentication methods

While the boilerplate’s API was built to use Google and LinkedIn’s authentication strategies, it is also easy to integrate other strategies.

First, read the [PassportJS documentation](http://www.passportjs.org/packages/). Then, make the following changes:

The authentication process is using the boilerplate API and it should be easy to add other strategies changing the following files:

* [passport-initializer](https://github.com/agencyenterprise/aeboilerplate/blob/master/api/src/config/passport-initializer.ts)
	* Update the `initializePassport` function to in initialize your new strategy.
	* Update the configuration file with API keys and other configurations required for your strategy.
* [authenticate.ts](https://github.com/agencyenterprise/aeboilerplate/blob/master/api/src/api/authentication/authenticate.ts) (contains routing for your new strategy)
	* Add routes for your service. 
		* Note: when following [O Auth2](https://oauth.net/2/)’s authentication pattern, two paths are required - one for the initial authenticate call and another for the callback. Make sure to use the same name that was set in the passport-initializer file, e.g. `passport.authenticate('facebookProvider')`.

Once everything has been configured, the boilerplate should automatically persist user authentication data to the database and save the token in the local storage.


### Protecting your routes

The client is prepared to add the authentication token and use it when calling the API. If you want to create a new protected route follow these steps: :poop: `This needs better wording` :poop:

**API**

Add the `ensureAuthenticated` middleware when creating your route, e.g.

```js
router.use('/', asyncHandler(ensureAuthenticated), (_, res) => res.send('AUTHENTICATED').status(200))
```

The `asyncHandler` will ensure your promise is resolved.
:poop: `How? Not sure I fully understand` :poop:

**Client**

Add your route to `ProtectedRoutes.tsx`.


## Deployment

For simplicity and ease-of-use, we use Heroku as our cloud service.

### Setting up your Heroku application

Prerequisites:
- [heroku cli](https://www.npmjs.com/package/heroku)
- a [Heroku](https://www.heroku.com/) account

1. In your project directory, run `heroku login` and enter your credentials.
2. Run `heroku create APP_NAME` to create your Heroku application. Copy your application URL for later steps.
3. Navigate to your application in the [heroku apps dashboard](https://dashboard.heroku.com/apps) and go to the Resources tab. Under Add-ons, add a [postgres](https://elements.heroku.com/addons/heroku-postgresql) database by searching for postgres in the search field. A `DATABASE_URL` [configuration variable](https://devcenter.heroku.com/articles/config-vars) is generated upon creation.
4. Navigate to your application's Settings tab in your heroku dashboard. Click on Reveal Vars and set the following values:
	* `LINKEDIN_ID`: the client ID for your application's [LinkedIn project](https://www.linkedin.com/developer/apps)
	* `LINKEDIN_SECRET`: the client secret for your LinkedIn project
	* `LINKEDIN_CALLBACK_URL`: `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/linkedin/callback` using the URL from step 2. 
		* :poop: `Do we need to set this in the LinkedIn developer page as well or is this already taken care of? Maybe I'm misunderstanding this step.` :poop:
		* :poop: `Why are we only showing LinkedIn stuff here?` :poop:
		* To check what is the URL created for your new app, go down in the Settings tab and look for the Domains and certificates item, your application URL will be there. :poop: `Is this redundant? Seems like it’s already taken care of from step 4` :poop: 
	* `SUCCESS_LOGIN_REDIRECT_URL`: `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/connect`
8. If you haven't already set up git for your project yet, run: `git init && git add . && git commit -m "First commit"`

### Deploying to Heroku
1. Deploy your application to Heroku by running `git push heroku master`. 
2. If you want to use a different Heroku app to deploy :poop: `Is this step necessary to show? Can we remove it?` :poop: 
	* Run `git remote remove heroku`
	* Run `git remote add heroku git@heroku.com:ANOTHER_HEROKU_APP_NAME.git`

## Continuous Integration

The boilerplate uses CircleCI for automated deployment to Heroku when pushing to your Github master branch.

### Setting up continuous integration with Circle CI and Heroku

Prerequisites:
- Heroku application has been set up ([Setting up your Heroku application](#setting-up-your-heroku-application))
- a [Circle CI](https://circleci.com/) account linked to your GitHub account hosting your project's repository


------------------------------------------
work in progress

1. Make sure you already have your Heroku application set up by following the steps 
2. Remove the comments from the deploy step inside `.circleci/config.yml`. ::Is this step necessary?::
3. Update the placeholder `HEROKU_APP_NAME` inside `.circleci/deploy-heroku.sh` script with your Heroku application name.
4. Create up to [Circle CI](https://circleci.com/) using your git hub account which contains the project you want to integrate.
5. Click on the `add projects` tab item on the left menu and `Set Up Project` right beside the project you want to integrate.
6. Choose Linux as the operating system, Node as language and click on the button for step 5, "Start building".
7. Click on the gear icon on the top right corner under your profile picture.
8. Click on `Checkout SSH keys` item on the left menu.
    * Click on `Authorize with GitHub` button.
    * Click on `Create and add YOUR_GIT_USER user key`.
9.  Go to your Heroku account and open your account settings clicking on your profile picture on the top right corner.
    * Scroll down and copy your API Key.
10. Go back to your Circle CI application settings and click on `Heroku deployment` item on the left menu.
    * Add your Heroku API key copied before.
    * Click on `Set User to YOUR_GIT_USER` button.

# Testing

The API and client are tested and we highly encourage you to keep them up when developing. The API tests are set in the `api/spec` folder and are basically integration tests. The client tests are set in the same folder as their components or tested files as they are unit tests.

You can run the tests by executing (in the meta-project folder):

```shell
npm run client-test
```

or

```shell
npm run api-test-watch
```
