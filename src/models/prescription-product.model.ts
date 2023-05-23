import { Prescription } from "./prescription.model";
import { Product } from "./product.model";

export interface PrescriptionProduct {
    id: number,
    prescription_id: number,
    prescription: Prescription,
    product_id: number,
    product: Product,
    qty: number,
    created_by: number,
    updated_by: number,
}

export interface SearchPrescriptionProduct {
    id?: number,
    prescription_id?: number,
    product_id?: number,
}