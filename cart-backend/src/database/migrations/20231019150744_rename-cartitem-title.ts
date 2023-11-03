import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('cart_items', function (table) {
    table.renameColumn('name', 'title')
  })
}

export async function down(knex: Knex): Promise<void> {}
