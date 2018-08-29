import winston from 'winston'

import config from './config'

const logger = winston.createLogger({
  format: winston.format.json(),
  level: config.logLevel,
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (config.env !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}

export default logger
