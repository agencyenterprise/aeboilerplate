import app from './app'
import { config } from './config'
import logger from './logger'

app.listen(+config.http.port, config.http.host, () => {
  logger.info(`Server started at [ http://${config.http.host}:${config.http.port} ]`)
  logger.info(`Environment: ${config.env}`)
})
