import { db } from '../../knex-connection'

export const saveAuthToken = async (rawAuthToken) => {
  const newAuthToken = {
    user_id: rawAuthToken.userId,
    token: rawAuthToken.token,
    provider: rawAuthToken.provider,
    status: rawAuthToken.status,
  }

  await db('auth_tokens').insert(newAuthToken)
}
