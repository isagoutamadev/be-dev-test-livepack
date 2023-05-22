import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("m_users").delete();
    await knex("m_users").insert([
        {
            uuid: "c6e9d6dd-abbd-4e58-a168-e057ba36fc69",
            username: "isagoutama",
            password: AuthHelper.encrypt("testing123"),
            created_at: knex.raw("now()"),
        },
        {
            uuid: "12c5b741-2d43-49e1-8880-60e274544cac",
            username: "isatama123",
            password: AuthHelper.encrypt("testing321"),
            created_at: knex.raw("now()"),
        },
        {
            uuid: "7ebe7e95-0ded-4b29-89d8-edba1a525e57",
            username: "isatama234",
            password: AuthHelper.encrypt("testing222"),
            created_at: knex.raw("now()"),
        },
    ]);
}
