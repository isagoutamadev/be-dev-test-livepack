import { Product, SearchProduct } from "@/models/product.model";
import { Paging } from "@/utils/responses/pagination.response";
import { ProductRepository } from "./product.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class ProductService {
    private repository = new ProductRepository();

    public get = async (search: SearchProduct): Promise<Paging<Product>> => {
        try {
            const redisResult = await this.repository.getRedis(search);
            
            if (redisResult.datas.length > 0) {
                console.log({redisResult});
                return redisResult;  
            }

            const result = await this.repository.get(search);

            await this.repository.setRedis(result.datas);

            return await this.get(search);
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