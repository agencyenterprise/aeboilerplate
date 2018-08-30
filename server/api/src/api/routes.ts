import errorMiddleware from 'error-middleware'
import express from 'express'

import authenticate from './authentication'

const router = express.Router()

router.use('/auth', authenticate)
router.use(errorMiddleware)

export default router
