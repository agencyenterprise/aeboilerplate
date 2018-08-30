import passport from 'passport'
import linkedInOauth2 from 'passport-linkedin-oauth2'

import config from './config'
import logger from './logger'

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
      (accessToken, refreshToken, profile, done) => {
        done(null, { accessToken, refreshToken, profile })
      },
    ),
  )

  passport.serializeUser((user: any, done) => {
    logger.debug(user.accessToken)
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => {
    logger.debug(user.accessToken)
    done(null, user)
  })
}
