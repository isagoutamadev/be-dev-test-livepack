import { Prescription, SearchPrescription } from "@/models/prescription.model";
import { Paging } from "@/utils/responses/pagination.response";
import { PrescriptionRepository } from "./prescription.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { v4 as uuid } from "uuid";
import { User } from "@/models/user.model";

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
    
    public create = async (data: Prescription, auth: User): Promise<Prescription> => {
        try {            
            await this.repository.create(data);
            data.created_by = auth.id;

            return data;
        } catch (error) {
            throw error;
        }
    }
    
    public confirm = async (id: number, auth: User): Promise<Prescription> => {
        try {
            const detail = await this.find({id: id});
            detail.updated_by = auth.id;

            detail.status = "confirmed";

            await this.repository.update(detail);

            return detail;
        } catch (error) {
            throw error;
        }
    }
    
    public cancel = async (id: number, auth: User): Promise<Prescription> => {
        try {            
            const detail = await this.find({id: id});
            detail.updated_by = auth.id;

            detail.status = "canceled";

            await this.repository.update(detail);

            return detail;
        } catch (error) {
            throw error;
        }
    }
}