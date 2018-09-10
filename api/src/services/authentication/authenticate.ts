import { db } from '../knex-connection'
import { saveAuthToken } from '../tokens/save-auth-token'
import { saveUser } from '../users/save-user'
import { getUserFromProfile } from './passport-profile-converter'

export const authenticate = async (authenticationInfo) => {
  const user = getUserFromProfile(authenticationInfo.profile)
  let userId = await getUserId(user.email)

  if (userId === 0) {
    userId = await saveUser(user)
  }

  const authToken = {
    userId,
    token: authenticationInfo.token,
    provider: authenticationInfo.profile.provider,
    status: 'active',
  }

  await saveAuthToken(authToken)
}

const getUserId = async (email: string) => {
  const user = await db('users')
    .select('id')
    .where({ email })
    .first()

  return user ? user.id : 0
}
