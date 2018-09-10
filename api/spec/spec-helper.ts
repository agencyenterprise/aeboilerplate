import supertest from 'supertest'

import { app } from '../src/app'
import { db } from '../src/services/knex-connection'

const clearTestData = async () => {
  await db('auth_tokens').truncate()
  await db('users').truncate()
}

const apiRequest = supertest(app)

export { db, clearTestData, apiRequest }
