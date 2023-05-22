import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("lt_price_configuration").del();
    await knex("lt_price_configuration").insert([
        { 
            id: 1,
            name: "Margin 10%",
        },
        { 
            id: 2,
            name: "Harga Tetap",
        },
    ]);
    // Deletes ALL existing entries
    await knex("m_products").del();

    // Inserts seed entries
    await knex("m_products").insert([
        { 
            sku: "SKU001",
            name: "Panadol",
            price_configuration_id: 1,
            price: 1000,
            tax_included: false,
            stock: 100,
        },
        { 
            sku: "SKU002",
            name: "Tempra",
            price_configuration_id: 2,
            price: 5000,
            tax_included: true,
            stock: 50,
        },
        { 
            sku: "SKU003",
            name: "Paracetamol",
            price_configuration_id: 1,
            price: 7000,
            tax_included: true,
            stock: 20,
        },
        { 
            sku: "SKU004",
            name: "Konidin",
            price_configuration_id: 1,
            price: 7000,
            tax_included: false,
            stock: 0,
        },
    ]);
};
