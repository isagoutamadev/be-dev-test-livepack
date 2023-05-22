import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_products", function (table) {
        table.increments("id").primary().notNullable();
        table.string("name").unique().notNullable();
        table.string("sku").unique().notNullable();
        table
            .integer("price_configuration_id")
            .unsigned()
            .nullable()
            .references("lt_price_configuration.id")
            .onDelete("cascade");
        table.integer("price").notNullable();
        table.boolean("tax_included").notNullable();
        table.integer("stock").unsigned().notNullable();
        table.integer("created_by").unsigned().nullable();
        table.integer("updated_by").unsigned().nullable();
        table.timestamps();
        table.integer("deleted_by").unsigned().nullable();
        table.timestamp("deleted_at").nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_products");
}
