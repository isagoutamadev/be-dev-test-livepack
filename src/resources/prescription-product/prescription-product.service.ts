import { PrescriptionProduct } from "@/models/prescription-product.model";
import { PrescriptionProductRepository } from "./prescription-product.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { User } from "@/models/user.model";
import { PrescriptionService } from "../prescription/prescription.service";
import { ProductService } from "../product/product.service";

export class PrescriptionProductService {
    private repository = new PrescriptionProductRepository();
    private prescriptionService = new PrescriptionService();
    private productService = new ProductService();

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

                const product = await this.productService.find({id: data.product_id});
                console.log(product);

                if (product.stock < data.qty) {
                    throw new HttpException("Stok produk tidak cukup", ResponseCode.UNPROCESSABLE_ENTITY);
                }

                await this.repository.update(data);
            } else {
                const product = await this.productService.find({id: data.product_id});

                if (product.stock < data.qty) {
                    throw new HttpException("Stok produk tidak cukup", ResponseCode.UNPROCESSABLE_ENTITY);
                }
                
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
                const product = await this.productService.find({id: data.product_id});

                if (product.stock < data.qty) {
                    throw new HttpException("Stok produk tidak cukup", ResponseCode.UNPROCESSABLE_ENTITY);
                }

                await this.repository.update(data);
            }

            return data;
        } catch (error) {
            throw error;
        }
    };
}
