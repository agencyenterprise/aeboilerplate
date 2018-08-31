import knex from 'knex'

import configuration from './config'

const knexConnection = knex(configuration.knex[configuration.env])

export const db = knexConnection
