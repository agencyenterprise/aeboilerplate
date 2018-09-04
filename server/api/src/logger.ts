import winston from 'winston'
import Transport from 'winston-transport'
import { dump } from 'dumper.js'

import { config } from './config'

class ObjectDumpTransport extends Transport {
  log(info, callback) {
    const dumpObject = info.level === 'debug'

    if (dumpObject) {
      dump(info.message)
    }

    callback()
  }
}

const winstonLogger = winston.createLogger({
  format: winston.format.json(),
  level: config.logLevel,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

if (config.env !== 'production') {
  winstonLogger.add(new ObjectDumpTransport())
}

export const logger = winstonLogger
