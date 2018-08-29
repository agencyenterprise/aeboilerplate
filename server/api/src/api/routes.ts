import errorMiddleware from 'error-middleware'
import express from 'express'

const router = express.Router()

router.use('/', (req, res) => res.sendStatus(200))

router.use(errorMiddleware)

export default router
