import cluster from 'cluster'
import os from 'os'

import { app } from './app'
import { config } from './config'
import { logger } from './services/logger'

const startServer = () => {
  app.listen(+config.http.port, config.http.host, () => {
    logger.info(`Server started at [ http://${config.http.host}:${config.http.port} ]`)
    logger.info(`Environment ${process.pid}: ${config.env}`)
  })
}

const startClusterServer = () => {
  if (!cluster.isMaster) {
    return startServer()
  }

  logger.info(`Master ${process.pid} is running`)
  const numCPUs = os.cpus().length

  logger.info(`Forking ${numCPUs} clusters`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info(`worker ${worker.process.pid} died`)
  })
}

if (config.nodeClusterEnabled) {
  startClusterServer()
} else {
  startServer()
}
