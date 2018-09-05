import express from 'express'
import passport from 'passport'
import asyncHandler from 'express-async-handler'

import { authenticateCallback } from '../../middlewares/passport-callback-authenticator'

const router = express.Router()

router.get('/linkedin/callback', asyncHandler(authenticateCallback))
router.get('/linkedin', passport.authenticate('linkedInProvider'))

export const authenticate = router
