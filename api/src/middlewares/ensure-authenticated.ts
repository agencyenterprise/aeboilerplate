import { db } from '../services/knex-connection'

export const ensureAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization || (req.session.passport && req.session.passport.user.token)

  if (token) {
    const validToken = await db('auth_tokens')
      .where({ token })
      .first()

    if (validToken && validToken.status === 'active') {
      return next()
    }
  }

  res.sendStatus(401)
}
