import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("m_users").delete();
    await knex("m_users").insert([
        {
            username: "isagoutama",
            password: AuthHelper.encrypt("testing123"),
            created_at: knex.raw("now()"),
        },
        {
            username: "isatama123",
            password: AuthHelper.encrypt("testing321"),
            created_at: knex.raw("now()"),
        },
        {
            username: "isatama234",
            password: AuthHelper.encrypt("testing222"),
            created_at: knex.raw("now()"),
        },
    ]);
}
