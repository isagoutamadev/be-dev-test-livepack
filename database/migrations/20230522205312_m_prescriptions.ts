import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_prescriptions", function (table) {
        table.increments("id").primary().notNullable();
        table.string("patient_name").notNullable();
        table.string("pharmacy").notNullable();
        table.string("doctor").notNullable();
        table.integer("total_price").defaultTo(0).unsigned().comment("if status confirmed");
        table.enu("status", ["created", "confirmed", "canceled"]).defaultTo("created").notNullable();
        table.integer("created_by").unsigned().nullable();
        table.integer("updated_by").unsigned().nullable();
        table.timestamps();
        table.integer("deleted_by").unsigned().nullable();
        table.timestamp("deleted_at").nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_prescriptions");
}