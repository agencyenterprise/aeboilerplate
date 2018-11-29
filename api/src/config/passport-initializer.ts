import passport from 'passport'
import facebookStrategy from 'passport-facebook'
import googleOauth2 from 'passport-google-oauth2'
import linkedInOauth2 from 'passport-linkedin-oauth2'

import { config } from '.'
import { authenticate } from '../services/authentication/authenticate'
import { logger } from '../services/logger'

export const initializePassport = () => {
  const callbackSuccess = (token, refreshToken, profile, done) => done(null, { token, refreshToken, profile })
  const addPassportProvider = (provider, Strategy, config) =>
    passport.use(
      provider,
      new Strategy(
        {
          ...config,
        },
        callbackSuccess,
      ),
    )

  addPassportProvider(config.auth.providers.google, googleOauth2.Strategy, config.auth.google)
  addPassportProvider(config.auth.providers.facebook, facebookStrategy, config.auth.facebook)
  addPassportProvider(config.auth.providers.linkedIn, linkedInOauth2.Strategy, config.auth.linkedIn)

  passport.serializeUser(async (authenticationInfo, done) => {
    logger.info('serializing user')

    await authenticate(authenticationInfo)

    done(null, authenticationInfo)
  })

  passport.deserializeUser(async (authenticationInfo, done) => {
    logger.info('deserializing user')

    await authenticate(authenticationInfo)

    done(null, authenticationInfo)
  })
}
