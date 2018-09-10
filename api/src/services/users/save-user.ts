import snakeCaseKeys from 'snakecase-keys'

import { db } from '../knex-connection'

export const saveUser = async (rawUser) => {
  const [id] = await db('users')
    .insert(snakeCaseKeys(rawUser))
    .returning('id')

  return id
}
