import passport from 'passport'

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

      return res.send({ success: true, token: user.token })
    })
  })(req, res, next)
}
