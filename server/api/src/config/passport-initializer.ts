import passport from 'passport'
import linkedInOauth2 from 'passport-linkedin-oauth2'

import { config } from '.'
import logger from '../logger'
import { authenticate } from '../services/authentication/authenticate'

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
