export interface Prescription {
    id: number,
    patient_name: string,
    pharmacy: string,
    doctor: string,
    total_price: number,
    status: string,
    created_by?: number,
    updated_by?: number,
}

export interface SearchPrescription {
    id?: number,
    created_by?: number,
}