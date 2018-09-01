import errorMiddleware from 'error-middleware'
import express from 'express'

import authenticate from './authentication/authenticate'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

const router = express.Router()

router.use('/auth', authenticate)
router.use('/', ensureAuthenticated, (req, res) => res.send('AUTHENTICATED').status(200))
router.use(errorMiddleware)

export default router
