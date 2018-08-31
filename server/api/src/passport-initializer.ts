import passport from 'passport'
import linkedInOauth2 from 'passport-linkedin-oauth2'
import { db } from './knex-connection'

import config from './config'
import logger from './logger'
import { saveUser } from '../src/services/users/save-user'
import { saveAuthToken } from '../src/services/tokens/save-auth-token'

export const initializePassport = () => {
  passport.use(
    'linkedInProvider',
    new linkedInOauth2.Strategy(
      {
        clientID: config.auth.linkedIn.clientID,
        clientSecret: config.auth.linkedIn.clientSecret,
        callbackURL: config.auth.linkedIn.callbackURL,
        scope: config.auth.linkedIn.scope,
      },
      (token, refreshToken, profile, done) => {
        done(null, { token, refreshToken, profile })
      },
    ),
  )

  passport.serializeUser(async (authenticationInfo: any, done) => {
    const user = getUser(authenticationInfo.profile)
    let userId = await getUserId(user.email)

    if (userId === 0) {
      userId = await saveUser(user)
    }

    if (userId > 0) {
      const {
        token,
        profile: { provider },
      } = authenticationInfo
      const authToken = getAuthToken({ userId, token, provider })

      await saveAuthToken(authToken)
    }

    done(null, authenticationInfo)
  })

  passport.deserializeUser((user: any, done) => {
    logger.debug(user.accessToken)
    done(null, user)
  })
}

const getUser = (profile): any => {
  const {
    provider,
    name: { givenName, familyName },
    emails,
    photos,
  } = profile

  const email = emails.length && emails.pop().value
  const photoUrl = photos.length && photos.pop().value

  const newUser = {
    provider: provider,
    first_name: givenName,
    last_name: familyName,
    photo_url: photoUrl,
    email,
  }

  return newUser
}

const getUserId = async (email: string) => {
  const user = await db('users')
    .select('id')
    .where({ email })
    .first()

  return user ? user.id : 0
}

const getAuthToken = ({ userId, token, provider }) => {
  return {
    user_id: userId,
    token,
    provider,
    status: 'active',
  }
}
