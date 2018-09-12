import passport from 'passport'
import url from 'url'

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
          pathname: 'http://localhost:3000/connect',
          query: {
            token: user.token,
          },
        }),
      )
    })
  })(req, res, next)
}
