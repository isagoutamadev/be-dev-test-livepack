export interface Product {
    id: number,
    name: string,
    sku: string,
    stock: number,
    price_configuration_id: number,
    price: number,
    final_price?: number,
    qty?: number,
    task_included: boolean,
}

export interface SearchProduct {
    id?: number,
    name?: string,
    sku?: string,
}