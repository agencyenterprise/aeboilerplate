import snakeCaseKeys from 'snakecase-keys'

import { db } from '../knex-connection'

export const saveAuthToken = async (rawAuthToken) => {
  await db('auth_tokens').insert(snakeCaseKeys(rawAuthToken))
}
