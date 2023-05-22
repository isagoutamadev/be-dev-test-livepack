import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_users", function (table) {
        table.increments("id").primary().notNullable();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.integer("created_by").unsigned().nullable();
        table.integer("updated_by").unsigned().nullable();
        table.timestamps();
        table.integer("deleted_by").unsigned().nullable();
        table.timestamp("deleted_at").nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_users");
}
