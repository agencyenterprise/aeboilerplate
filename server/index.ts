import cluster from 'cluster'
import express from 'express'
import os from 'os'
import path from 'path'

import { app } from '../api/src/app'
import { config } from './config'
import { logger } from '../api/src/services/logger'

logger.info(path.join(__dirname, '../client/build'))

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`)
  const numCPUs = os.cpus().length

  logger.info(`Forking ${numCPUs} clusters`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info(`worker ${worker.process.pid} died`)
  })
} else {
  app.listen(+config.http.port, config.http.host, () => {
    logger.info(`Server started at [ http://${config.http.host}:${config.http.port} ]`)
    logger.info(`Environment ${process.pid}: ${config.env}`)
  })
}
