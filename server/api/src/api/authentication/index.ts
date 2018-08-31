import express from 'express'
import passport from 'passport'

import { wrap } from '../wrap'
import { authenticate } from './authenticate'

const router = express.Router()

router.get('/linkedin/callback', passport.authenticate('linkedInProvider'), wrap(authenticate))
router.get('/linkedin', passport.authenticate('linkedInProvider'))

export default router
