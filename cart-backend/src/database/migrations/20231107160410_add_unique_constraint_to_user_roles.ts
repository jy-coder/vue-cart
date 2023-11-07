import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user_roles', (table) => {
    table.unique(['user_id', 'role_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user_roles', (table) => {
    table.dropUnique(['user_id', 'role_id'])
  })
}
