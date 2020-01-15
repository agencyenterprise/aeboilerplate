import supertest from 'supertest'

import { app } from '../src/app'
import { config } from '../src/config';
import { db } from '../src/services/knex-connection'

const clearTestData = async () => {
  if (config.env !== 'test') {
    // tslint:disable-next-line:no-console
    console.error('Can\'t truncate tables if ENV is different from "test"')
    throw new Error('you can only truncate tables if running on "test" NODE_ENV')
  }

  await db('auth_tokens').truncate()
  await db('users').truncate()
}

const apiRequest = supertest(app)

export { db, clearTestData, apiRequest }
