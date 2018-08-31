import { db } from '../../knex-connection'

export const saveUser = async (user, transaction?: any) => {
  const [id] = await db('users')
    .insert(user)
    .returning('id')

  return id
}
