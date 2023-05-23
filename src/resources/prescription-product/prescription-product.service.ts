import { PrescriptionProduct } from "@/models/prescription-product.model";
import { Paging } from "@/utils/responses/pagination.response";
import { PrescriptionProductRepository } from "./prescription-product.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { User } from "@/models/user.model";
import { PrescriptionService } from "../prescription/prescription.service";

export class PrescriptionProductService {
    private repository = new PrescriptionProductRepository();
    private prescriptionService = new PrescriptionService();

    private validatePrescriptionStatus = async (data: PrescriptionProduct) => {
        try {
            const prescription = await this.prescriptionService.find({
                id: data.prescription_id,
            });

            if (prescription.status != "created") {
                new HttpException(
                    "Status resep telah" +
                        (prescription.status === "confirmed"
                            ? "terkonfirmasi"
                            : "dibatalkan"),
                    ResponseCode.UNPROCESSABLE_ENTITY
                );
            }

        } catch (error) {
            throw error;
        }
    }

    public create = async (
        data: PrescriptionProduct,
        auth: User
    ): Promise<PrescriptionProduct> => {
        try {
            await this.validatePrescriptionStatus(data);

            const detail = await this.repository.find({
                prescription_id: data.prescription_id,
                product_id: data.product_id,
            });

            if (detail) {
                data.updated_by = auth.id || 0;
                data.qty += detail.qty;
                await this.repository.update(data);
            } else {
                data.created_by = auth.id || 0;
                await this.repository.create(data);
            }

            return data;
        } catch (error) {
            throw error;
        }
    };
    
    public update = async (
        data: PrescriptionProduct,
        auth: User
    ): Promise<PrescriptionProduct> => {
        try {
            await this.validatePrescriptionStatus(data);

            data.updated_by = auth.id || 0;
            if (data.qty === 0) {
                await this.repository.delete(data);
            } else {
                await this.repository.update(data);
            }

            return data;
        } catch (error) {
            throw error;
        }
    };
}
