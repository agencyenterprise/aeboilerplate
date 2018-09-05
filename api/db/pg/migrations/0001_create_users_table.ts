import Knex from 'knex'

exports.up = (knex: Knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table
      .string('email')
      .unique()
      .notNullable()
      .index('idx_users_email')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('photo_url')
    table.string('provider')
    table.timestamps(false, true)
  })
}

exports.down = (knex: Knex) => {
  return knex.schema.dropTableIfExists('users')
}
