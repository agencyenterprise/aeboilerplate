import { db } from '../src/knex-connection'

const clearTestData = async () => {
  await db('auth_tokens').truncate()
  await db('users').truncate()
}

export { db, clearTestData }
