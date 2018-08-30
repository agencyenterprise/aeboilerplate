import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/provider/callback', passport.authenticate('provider'), (req, res) => res.sendStatus(200))
router.get('/provider', passport.authenticate('provider'))

export default router
