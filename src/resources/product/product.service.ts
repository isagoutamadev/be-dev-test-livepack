import { Product, SearchProduct } from "@/models/product.model";
import { Paging } from "@/utils/responses/pagination.response";
import { ProductRepository } from "./product.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class ProductService {
    private repository = new ProductRepository();

    private calculateRealPrice(product: Product): number {
        let price = Number(product.price);

        if (product.price_configuration_id === 1) {
            price = product.price * 0.1 + product.price;
        }
        
        if (!product.task_included) {
            price = price * 0.11 + price;
        }

        return price;
    }

    public get = async (search: SearchProduct, requestTime: number): Promise<Paging<Product>> => {
        try {
            const redisResult = await this.repository.getRedis(search);
            
            if (redisResult.datas.length > 0) {
                redisResult.datas = redisResult.datas.map(item => {

                    item.real_price = this.calculateRealPrice(item);

                    return item;
                });

                return redisResult;
            }

            const result = await this.repository.get(search);


            if (redisResult.datas.length === 0 && result.datas.length === 0) { 
                // jika data redis dan db utama kosong
                return result;
            }

            if (redisResult.datas.length == 0 && result.datas.length > 0 && (search.name || search.sku)) {
                // jika data redis kosong dan db utama tidak kosong dan menggunakan search
                return redisResult;
            }

            await this.repository.setRedis(result.datas);

            // if (Date.now() > (requestTime + 1000)) { 
            //     // if request time more then 1 second (opsional)
            //     return redisResult;
            // }

            return await this.get(search, requestTime);
        } catch (error) {
            throw error;
        }
    }
    
    public find = async (search: SearchProduct): Promise<Product> => {
        try {  
            const result = await this.repository.find(search);

            if (result) {
                return result;
            }

            throw new HttpException("Produk tidak ditemukan", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}