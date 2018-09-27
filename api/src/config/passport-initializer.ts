import passport from 'passport'
import googleOauth2 from 'passport-google-oauth2'
import linkedInOauth2 from 'passport-linkedin-oauth2'

import { config } from '.'
import { authenticate } from '../services/authentication/authenticate'
import { logger } from '../services/logger'

export const initializePassport = () => {
  passport.use(
    'googleProvider',
    new googleOauth2.Strategy(
      {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbackURL,
        scope: config.auth.google.scope,
      },
      (token, refreshToken, profile, done) => {
        done(null, { token, refreshToken, profile })
      },
    ),
  )
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
