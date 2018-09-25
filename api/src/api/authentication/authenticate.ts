import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'

import { authenticateCallback } from '../../middlewares/passport-callback-authenticator'

const router = express.Router()

router.get('/linkedin/callback', asyncHandler(authenticateCallback))
router.get('/linkedin', passport.authenticate('linkedInProvider'))
router.get('/google/callback', asyncHandler(authenticateCallback))
router.get('/google', passport.authenticate('googleProvider'))

export const authenticate = router
