### _Before running any command make sure you installed all meta packages running `npm install` in the meta folder._

# AE Node Boilerplate - API

The API boilerplate consists in an NodeJS, Express, REST structure to facilitate the kickstart of a project.

The built in routes are:

- `/auth/linkedin`

  - The auth linkedin route must be called using a browser to access the linkedin login page. It saves a new user in the users table and a new token in the auth_tokens table when everything runs as expected.

- `/`
  - The root route has a middleware to check whether the user is authenticated or not and it needs an Authorization header containing the token returned by the auth/linkedin route.

Important: in order to have a working authentication process, the user must register the application in the LinkedIn developer page (https://www.linkedin.com/developer/apps), changing the client id, client secret in the API docker-compose file, and adding the callback URL `/auth/linkedin/callback` to the new application created on LinkedIn developer page.

## Standalone run

Running the API locally. The API will be accessible by default on http://localhost:3000. If you are running the API for the first time, execute the command `npm run api-npm i` before starting it.

```
npm run api-start
```

Running the API tests.

```
npm run api-test
```

Running the API node package manager, enabling the developer to run any npm command inside the API, e.g.: `npm run api-npm i` or `npm run api-npm i SOME_PACKAGE -D`

```
npm run api-npm
```

## Project structure

```
- /db
    - /pg
        - /migrations
            - Contains the migration files used by Knex to manipulate the database schema
- /spec
    - /e2e
        - End to end tests
    - /fixtures
        - Tests fixtures folder to be shared between end to end, and unit tests
- /src
    - /api
        - index
            - API entry point, change this file to amend the API basic access point
        - routes
            - Express routes used by the API
    - /config
        - Application configuration file and any other configuration initializer
    - /middlewares
        - Express middlwares
    - /services
        - Business logic scripts to be consumed by the API
    - app
        - Setup the express application using the following libraries
            - 'body-parser'
            - 'express'
            - 'express-session'
            - 'passport'
            - 'express-rate-limit'
            - 'cors'
        - Initialize Passport.JS configuration
        - Load the routes registered in /api/index
    - knex-connection
        - Starts the database connection using the application configuration file
    - logger
        - Uses winston to log to the console
        - Dump objects (dumper.js) when using `logger.debug` in the development environment
    - server
        - Starts an express server using Node cluster to fork the number of instaces based on the CPU cores count
- /tasks
    - migrate
        - Executes the knex migration files
```

# AE Node Boilerplate - Client

Create the client project running the following command

```
npm run create-client
```
