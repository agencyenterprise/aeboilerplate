import { db } from '../src/services/knex-connection'
import { logger } from '../src/services/logger'

logger.info('migration started')

db.migrate.latest().then(() => {
  logger.info('migration succeeded')
  process.exit()
})
