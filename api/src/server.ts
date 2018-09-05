import cluster from 'cluster'
import os from 'os'

import { app } from './app'
import { config } from './config'
import { logger } from './logger'

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`)
  const numCPUs = os.cpus().length

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  app.listen(+config.http.port, config.http.host, () => {
    logger.info(`Server started at [ http://${config.http.host}:${config.http.port} ]`)
    logger.info(`Environment ${process.pid}: ${config.env}`)
  })

  console.log(`Worker ${process.pid} started`)
}
