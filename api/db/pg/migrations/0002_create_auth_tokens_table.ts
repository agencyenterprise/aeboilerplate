import Knex from 'knex'

exports.up = (knex: Knex) => {
  return knex.schema.createTable('auth_tokens', (table) => {
    table.increments('id').primary()
    table.text('token').notNullable()
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
    table.string('status').notNullable()
    table.string('provider').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = (knex: Knex) => {
  return knex.schema.dropTableIfExists('auth_tokens')
}
