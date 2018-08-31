import knex from 'knex'

import configuration from './config'

const knexConnection = knex(configuration.knex)

export const db = knexConnection
