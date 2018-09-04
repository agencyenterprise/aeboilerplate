import knex from 'knex'

import { config } from './config'

const knexConnection = knex(config.knex)

export const db = knexConnection
