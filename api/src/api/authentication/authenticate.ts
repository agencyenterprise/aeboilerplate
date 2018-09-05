import express from 'express'
import passport from 'passport'

import { authenticateCallback } from '../../middlewares/passport-callback-authenticator'

const router = express.Router()

router.get('/linkedin/callback', authenticateCallback)
router.get('/linkedin', passport.authenticate('linkedInProvider'))

export const authenticate = router
