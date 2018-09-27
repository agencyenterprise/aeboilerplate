import { db } from '../knex-connection'

export const getMe = async (req) => {
  const token = req.headers.authorization

  const meColumns = ['email', 'first_name', 'last_name', 'photo_url']

  const user = await db('users')
    .join('auth_tokens', 'auth_tokens.user_id', 'users.id')
    .select(meColumns)
    .where({ token })
    .first()

  return user
}
