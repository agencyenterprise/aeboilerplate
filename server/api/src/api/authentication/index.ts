import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/linkedin/callback', passport.authenticate('linkedInProvider'), (req, res) => res.sendStatus(200))
router.get('/linkedin', passport.authenticate('linkedInProvider'))

export default router
