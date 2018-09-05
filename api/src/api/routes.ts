import errorMiddleware from 'error-middleware'
import express from 'express'
import asyncHandler from 'express-async-handler'

import { authenticate } from './authentication/authenticate'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

const router = express.Router()

router.use('/auth', asyncHandler(authenticate))
router.use('/', asyncHandler(ensureAuthenticated), (_, res) => res.send('AUTHENTICATED').status(200))
router.use(errorMiddleware)

export const routes = router
