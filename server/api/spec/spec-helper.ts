import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import { db } from '../src/knex-connection'
import { app } from '../src/app'

chai.use(chaiHttp)

const apiRequest = () => chai.request(app)

const clearTestData = async () => {
  await db('auth_tokens').truncate()
  await db('users').truncate()
}

export { expect, db, apiRequest, clearTestData }
