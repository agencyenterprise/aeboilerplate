import passport from 'passport'
import linkedInOauth2 from 'passport-linkedin-oauth2'

import config from './config'
import logger from './logger'

export function initializePassport() {
  passport.use(
    'provider',
    new linkedInOauth2.Strategy(
      {
        clientID: config.auth.linkedIn.clientID,
        clientSecret: config.auth.linkedIn.clientSecret,
        callbackURL: config.auth.linkedIn.callbackURL,
        scope: config.auth.linkedIn.scope,
      },
      function(accessToken, refreshToken, profile, done) {
        done(null, { accessToken, refreshToken, profile })
      },
    ),
  )

  passport.serializeUser(function(user: any, done) {
    logger.debug(user.accessToken)
    done(null, user)
  })

  passport.deserializeUser(function(user: any, done) {
    logger.debug(user.accessToken)
    done(null, user)
  })
}
