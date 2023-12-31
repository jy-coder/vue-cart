import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("carts", (table: Knex.TableBuilder) => {
    table.dropColumn("name");
  });
}

export async function down(knex: Knex): Promise<void> {}
