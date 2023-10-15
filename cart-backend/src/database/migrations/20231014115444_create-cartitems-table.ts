import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cart_items", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("price").notNullable();
    table.integer("quantity").notNullable();
    table.integer("cartId").unsigned().notNullable();

    table.foreign("cartId").references("id").inTable("carts");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cart_items");
}
