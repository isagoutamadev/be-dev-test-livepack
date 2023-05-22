import { Prescription, SearchPrescription } from "@/models/prescription.model";
import { Paging } from "@/utils/responses/pagination.response";
import { PrescriptionRepository } from "./prescription.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { v4 as uuid } from "uuid";

export class PrescriptionService {
    private repository = new PrescriptionRepository();
    public get = async (search: Prescription): Promise<Paging<Prescription>> => {
        try {            
            const result = await this.repository.get(search);

            return result;
        } catch (error) {
            throw error;
        }
    }
    
    public find = async (search: SearchPrescription): Promise<Prescription> => {
        try {            
            const result = await this.repository.find(search);

            if (result) {
                return result;
            }

            throw new HttpException("Resep tidak ditemukan", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
    
    public create = async (data: Prescription): Promise<Prescription> => {
        try {            
            await this.repository.create(data);

            return data;
        } catch (error) {
            throw error;
        }
    }
}