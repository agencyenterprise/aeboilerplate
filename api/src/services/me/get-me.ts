import { db } from '../knex-connection'

export const getMe = async (req) => {
  const token = req.headers.authorization

  const meColumns = ['email', 'first_name', 'last_name', 'photo_url']

  const user = await db('users')
    //.join('auth_tokens', 'auth_tokens.user_id', 'user.id')
    .select(meColumns)
    //.where({ token })
    .first()

  console.log(user)

  return user
}
