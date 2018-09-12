import passport from 'passport'
import url from 'url'

import { config } from '../config'

export const authenticateCallback = (req, res, next) => {
  passport.authenticate('linkedInProvider', (error, user) => {
    if (error) {
      return next(error)
    }

    if (!user) {
      return res.send({ success: false, message: 'authentication failed' })
    }

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError)
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
