import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("carts", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("userId").unsigned().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("carts");
}
