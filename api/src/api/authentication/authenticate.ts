import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'

import { config } from '../../config'
import { authenticatePassportProvider } from '../../middlewares/passport-callback-authenticator'

const router = express.Router()

router.get('/linkedin/callback', asyncHandler(authenticatePassportProvider(config.auth.providers.linkedIn)))
router.get('/linkedin', passport.authenticate(config.auth.providers.linkedIn))
router.get('/google/callback', asyncHandler(authenticatePassportProvider(config.auth.providers.google)))
router.get('/google', passport.authenticate(config.auth.providers.google))
router.get('/facebook/callback', asyncHandler(authenticatePassportProvider(config.auth.providers.facebook)))
router.get('/facebook', passport.authenticate(config.auth.providers.facebook))

export const authenticate = router
