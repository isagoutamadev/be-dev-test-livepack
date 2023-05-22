import { Product, SearchProduct } from "@/models/product.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";
import redisClient from "@/utils/redis/redis";

export class ProductRepository {
    async getRedis(search: SearchProduct): Promise<Paging<Product>> {
        try {
            const redisData = await redisClient.get("products") as any as string;
            
            let datas = [] as Product[];
            if (redisData) {
                if (redisData != '') {
                    datas = JSON.parse(redisData) as Product[];
                    if (search.name) {
                        console.log({search});
                        // @ts-ignore
                        datas = datas.filter(item => item.name.toLocaleLowerCase().includes(search.name?.toLocaleLowerCase()));
                    }
                    
                    if (search.sku) {
                        // @ts-ignore
                        datas = datas.filter(item => item.sku.toLocaleLowerCase().includes(search.sku?.toLocaleLowerCase()));
                    }

                }
            }
            
            const pagination = new Pagination<Product>(
                datas,
            );

            return pagination.getPaging();
        } catch (error) {
            throw error;
        }
    }
    
    async setRedis(datas?: Product[]): Promise<void> {
        try {
            await redisClient.set("products", datas ? JSON.stringify(datas) : '');
        } catch (error) {
            throw error;
        }
    }
    
    async get(search: SearchProduct): Promise<Paging<Product>> {
        try {
            const select = [
                "product.id",
                "product.sku",
                "product.name",
                "product.stock",
                "product.price_configuration_id",
                "product.price",
                "product.tax_included",
            ];

            const query = knex("m_products as product").select(select);

            query.whereNull("product.deleted_at");

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