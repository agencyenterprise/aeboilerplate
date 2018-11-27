import passport from 'passport'
import facebookStrategy from 'passport-facebook'
import googleOauth2 from 'passport-google-oauth2'
import linkedInOauth2 from 'passport-linkedin-oauth2'

import { config } from '.'
import { authenticate } from '../services/authentication/authenticate'
import { logger } from '../services/logger'

export const initializePassport = () => {
  const callbackSuccess = (token, refreshToken, profile, done) => done(null, { token, refreshToken, profile })

  passport.use(
    'googleProvider',
    new googleOauth2.Strategy(
      {
        ...config.auth.google,
      },
      callbackSuccess,
    ),
  )

  passport.use(
    'facebookProvider',
    new facebookStrategy(
      {
        ...config.auth.facebook,
      },
      callbackSuccess,
    ),
  )

  passport.use(
    'linkedInProvider',
    new linkedInOauth2.Strategy(
      {
        ...config.auth.linkedIn,
      },
      callbackSuccess,
    ),
  )

  passport.serializeUser(async (authenticationInfo, done) => {
    logger.info('serializing user')

    await authenticate(authenticationInfo)

    done(null, authenticationInfo)
  })

  passport.deserializeUser((authenticationInfo, done) => {
    logger.info('deserializing user')
    done(null, authenticationInfo)
  })
}
