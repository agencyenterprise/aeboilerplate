import { db } from '../../knex-connection'

export const saveAuthToken = async (authToken) => {
  await db('auth_tokens').insert(authToken)
}
