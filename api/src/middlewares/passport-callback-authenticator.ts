import passport from 'passport'
import url from 'url'

import { config } from '../config'
import { logger } from '../services/logger'

export const authenticatePassportProvider = (provider) => {
  return (req, res, next) => {
    passport.authenticate(provider, (error, user) => {
      if (error) {
        logger.error('Authentication error', error)

        next(error)
      }

      if (!user) {
        return res.send({ success: false, message: 'authentication failed' })
      }

      req.login(user, (error) => {
        if (error) {
          logger.error('Authentication error', error)

          return next(error)
        }

        res.redirect(
          url.format({
            pathname: config.auth.successLoginRedirectUrl,
            query: {
              token: user.token,
            },
          }),
        )
      })
    })(req, res, next)
  }
}
