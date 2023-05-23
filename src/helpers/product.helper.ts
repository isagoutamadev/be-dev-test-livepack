import { Product } from "@/models/product.model";

export default class ProductHelper {
    static calculateFinalPricePerProduct(product: Product): number {
        let price = Number(product.price);

        if (product.price_configuration_id === 1) {
            price = product.price * 0.1 + product.price;
        }
        
        if (!product.task_included) {
            price = price * 0.11 + price;
        }

        return price;
    }
    
    static calculateFinalPriceProductQty(product: Product): number {
        let price = Number(product.price);

        if (product.price_configuration_id === 1) {
            price = product.price * 0.1 + product.price;
        }
        
        if (!product.task_included) {
            price = price * 0.11 + price;
        }

        if (product.qty) {
            price = price * product.qty;
        }

        return price;
    }

    static calculateTotalPriceProducts(products: Product[]): number {
        let price = 0;

        products.forEach(item => {
            price += item.final_price || 0;
        });

        return price;
    }
}
