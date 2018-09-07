import { db } from '../knex-connection'

export const saveUser = async (rawUser) => {
  const newUser = {
    first_name: rawUser.firstName,
    last_name: rawUser.lastName,
    photo_url: rawUser.photoUrl,
    email: rawUser.email,
    provider: rawUser.provider,
  }

  const [id] = await db('users')
    .insert(newUser)
    .returning('id')

  return id
}
