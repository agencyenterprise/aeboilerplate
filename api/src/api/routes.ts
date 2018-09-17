import errorMiddleware from 'error-middleware'
import express from 'express'
import asyncHandler from 'express-async-handler'

import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { authenticate } from './authentication/authenticate'
import { me } from './me'

const router = express.Router()

router.use('/auth', asyncHandler(authenticate))
router.use(me)
router.use('/', asyncHandler(ensureAuthenticated), (_, res) => res.send('AUTHENTICATED').status(200))
router.use(errorMiddleware)

export const routes = router
