import { Prescription, SearchPrescription } from "@/models/prescription.model";
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
            ];

            const query = knex("m_prescriptions as prescription").select(select);

            const datas = await query;
            const pagination = new Pagination<Prescription>(
                datas
            );

            return pagination.getPaging();
        } catch (error) {
            throw error;
        }
    }
    
    async find(search: SearchPrescription): Promise<Prescription|undefined> {
        try {
            const select = [
                "prescription.id",
                "prescription.patient_name",
                "prescription.pharmacy",
                "prescription.doctor",
                "prescription.total_price",
            ];

            const query = knex("m_prescriptions as prescription").select(select);

            if (search.id) {
                query.where("prescription.id", search.id);
            }

            const data = await query.first();
            
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    async create(data: Prescription): Promise<void> {
        try {
            await knex("m_prescriptions").insert(data);
        } catch (error) {
            throw error;
        }
    }
}