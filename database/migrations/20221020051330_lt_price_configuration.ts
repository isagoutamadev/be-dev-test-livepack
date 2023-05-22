import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("lt_price_configuration", function (table) {
        table.increments("id").primary().notNullable();
        table.string("name").unique().notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("lt_price_configuration");
}
