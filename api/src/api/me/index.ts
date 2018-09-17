import express from 'express'
import asyncHandler from 'express-async-handler'

import { fetchMe } from './get-me'

import { ensureAuthenticated } from '../../middlewares/ensure-authenticated'

const router = express.Router()

router.get('/me', asyncHandler(ensureAuthenticated), asyncHandler(fetchMe))

export const me = router
