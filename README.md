# Boilerplate overview

## API

### Project structure

* /db
    * /pg
        * /migrations
            * Contains the migration files used by Knex to manipulate the database schema
* /spec
    * /e2e
        * End to end tests
    * /fixtures
        * Tests fixtures folder to be shared between end to end, and unit tests
* /src
    * /api
        * index
            * API entry point, change this file to amend the API basic access point
        * routes
            * Express routes used by the API
    * /config
        * Application configuration file and any other configuration initializer
    * /middlewares
        * Express middlwares
    * /services
        * Business logic scripts to be consumed by the API
    * app
        * Setup the express application using the following libraries
            * 'body-parser'
            * 'express'
            * 'express-session'
            * 'passport'
            * 'express-rate-limit'
            * 'cors'
        * Initialize Passport.JS configuration
        * Load the routes registered in /api/index
    * knex-connection
        * Starts the database connection using the application configuration file
    * logger
        * Uses winston to log to the console 
        * Dump objects (dumper.js) when using `logger.debug` in the development environment
    * server
        * Starts an express server using Node cluster to fork the number of instaces based on the CPU cores count
* /tasks
    * migrate
        * Executes the knex migration files
  

## Client

Create the client project running the following command

```
node client-generator/index.js
```
