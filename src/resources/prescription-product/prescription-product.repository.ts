import {
    PrescriptionProduct,
    SearchPrescriptionProduct,
} from "@/models/prescription-product.model";
import knex from "@/utils/knex/knex";

export class PrescriptionProductRepository {
    async find(
        search: SearchPrescriptionProduct
    ): Promise<PrescriptionProduct | undefined> {
        try {
            const query = knex("m_prescription_products as product");

            if (search.prescription_id) {
                query.where("product.prescription_id", search.prescription_id);
            }
            if (search.product_id) {
                query.where("product.product_id", search.product_id);
            }

            const result = await query.first();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async create(data: PrescriptionProduct): Promise<void> {
        try {
            await knex("m_prescription_products").insert({
                ...data,
                concat_id: `${data.prescription_id}_${data.product_id}`,
                created_at: knex.raw("now()"),
            });
        } catch (error) {
            throw error;
        }
    }

    async update(data: PrescriptionProduct): Promise<void> {
        try {
            await knex("m_prescription_products")
                .update({
                    ...data,
                    updated_at: knex.raw("now()"),
                })
                .where(
                    "concat_id",
                    `${data.prescription_id}_${data.product_id}`
                );
        } catch (error) {
            throw error;
        }
    }

    async delete(data: PrescriptionProduct): Promise<void> {
        try {
            await knex("m_prescription_products")
                .delete()
                .where(
                    "concat_id",
                    `${data.prescription_id}_${data.product_id}`
                );
        } catch (error) {
            throw error;
        }
    }
}
