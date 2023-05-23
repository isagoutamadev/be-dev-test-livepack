import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_prescription_products", function (table) {
        table.bigIncrements("id").primary().notNullable();
        table
            .string("concat_id")
            .unique()
            .notNullable()
            .comment(
                "concat beetween prescription_id and product_id separated by underscore"
            );
        table
            .integer("prescription_id")
            .unsigned()
            .notNullable()
            .references("m_prescriptions.id");
        table
            .integer("product_id")
            .unsigned()
            .notNullable()
            .references("m_products.id");
        table.integer("qty").defaultTo(0).unsigned();
        table
            .integer("final_price")
            .defaultTo(0)
            .unsigned()
            .comment("filled if confirmed");
        table.integer("created_by").unsigned().nullable();
        table.integer("updated_by").unsigned().nullable();
        table.timestamps();
        table.integer("deleted_by").unsigned().nullable();
        table.timestamp("deleted_at").nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_prescription_products");
}
