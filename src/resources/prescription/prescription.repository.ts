import ProductHelper from "@/helpers/product.helper";
import { Prescription, SearchPrescription } from "@/models/prescription.model";
import { Product } from "@/models/product.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class PrescriptionRepository {
    async get(search: SearchPrescription): Promise<Paging<Prescription>> {
        try {
            const select = [
                "prescription.id",
                "prescription.patient_name",
                "prescription.pharmacy",
                "prescription.doctor",
                "prescription.total_price",
                "prescription.status",
                knex.raw(`COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
                    'id', product.id,
                    'sku', product.sku,
                    'name', product.name,
                    'price_configuration_id', product.price_configuration_id,
                    'price', product.price,
                    'tax_included', product.tax_included,
                    'qty', mpp.qty,
                    'final_price', mpp.final_price
                )) FILTER (WHERE product.id IS NOT NULL), '[]') as products`),
            ];

            const query = knex("m_prescriptions as prescription").select(select);

            query.leftJoin("m_prescription_products as mpp", "mpp.prescription_id", "prescription.id");
            query.leftJoin("m_products as product", "product.id", "mpp.product_id");


            if (search.created_by) {
                query.where("prescription.created_by", search.created_by);
            }

            query.groupBy("prescription.id");

            const datas = await query;
            const pagination = new Pagination<Prescription>(
                datas.map((item: Prescription) => {
                    if (item.status === "created") {
                        item.products = item.products.map((product: Product) => {
                            product.final_price = ProductHelper.calculateFinalPriceProductQty(product);
                            return product;
                        });
                        item.total_price = ProductHelper.calculateTotalPriceProducts(item.products)
                    }
                    return item;
                })
            );

            return pagination.getPaging();
        } catch (error) {
            throw error;
        }
    }
    
    async find(search: SearchPrescription): Promise<Prescription|undefined> {
        try {
            const select: Array<any> = [
                "prescription.id",
                "prescription.patient_name",
                "prescription.pharmacy",
                "prescription.doctor",
                "prescription.total_price",
                "prescription.status",
                knex.raw(`COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
                    'id', product.id,
                    'sku', product.sku,
                    'name', product.name,
                    'price_configuration_id', product.price_configuration_id,
                    'price', product.price,
                    'tax_included', product.tax_included,
                    'qty', mpp.qty,
                    'final_price', mpp.final_price
                )) FILTER (WHERE product.id IS NOT NULL), '[]') as products`),
            ];

            const query = knex("m_prescriptions as prescription").select(select);
            query.leftJoin("m_prescription_products as mpp", "mpp.prescription_id", "prescription.id");
            query.leftJoin("m_products as product", "product.id", "mpp.product_id");

            if (search.id) {
                query.where("prescription.id", search.id);
            }

            query.groupBy("prescription.id");

            const data = await query.first();

            data.products = data.products.map((item: Product) => {
                item.final_price = ProductHelper.calculateFinalPriceProductQty(item);

                return item;
            });
            
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    async create(data: Prescription): Promise<void> {
        try {
            await knex("m_prescriptions").insert({
                ...data,
                created_at: knex.raw("now()")
            });
        } catch (error) {
            throw error;
        }
    }
    
    async update(data: Prescription): Promise<void> {
        try {
            await knex("m_prescriptions").update({
                ...data,
                updated_at: knex.raw("now()")
            }).where("id", data.id);
        } catch (error) {
            throw error;
        }
    }
}