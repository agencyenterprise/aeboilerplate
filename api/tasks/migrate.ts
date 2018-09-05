import { db } from '../src/knex-connection'
import { logger } from '../src/logger'

logger.info('migration started')

db.migrate.latest().then(() => {
  logger.info('migration succeeded')
  process.exit()
})
