import { Product, SearchProduct } from "@/models/product.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class ProductRepository {
    async get(search: SearchProduct): Promise<Paging<Product>> {
        try {
            const select = [
                "product.id",
                "product.sku",
                "product.price_configuration_id",
                "product.price",
                "product.tax_included",
            ];

            const query = knex("m_products as product").select(select);

            if (search.name) {
                query.whereILike("product.name", `%${search.name}%`);
            }
            
            if (search.sku) {
                query.whereILike("product.sku", `%${search.sku}%`);
            }

            // const offset = limit * page - limit;
            // const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            // const [datas, count] = await Promise.all([
            //     await query.limit(limit).offset(offset),
            //     await queryCount
            // ]);
            const datas = await query;
            const pagination = new Pagination<Product>(
                datas,
            );

            return pagination.getPaging();
        } catch (error) {
            throw error;
        }
    }
    
    async find(search: SearchProduct): Promise<Product|undefined> {
        try {
            const select = [
                "product.id",
                "product.sku",
                "product.name",
                "product.price_configuration_id",
                "product.price",
                "product.tax_included",
            ];

            const query = knex("m_products as product").select(select);

            if (search.id) {
                query.where("product.id", search.id);
            }

            const data = await query.first();

            return data;
        } catch (error) {
            throw error;
        }
    }
}