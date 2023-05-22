import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { Product } from '@/models/product.model';
import {  } from '@/schemas/product.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { ProductService } from './product.service';
import { PagingSchema } from '@/schemas/paging.schema';
import { IDSchema } from '@/schemas/global.schema';

export class ProductController implements Controller {
    public path = 'products';
    public router = Router();
    private service = new ProductService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            '/',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            this.get
        );
        this.router.get(
            '/:id',
            authMiddleware(),
            validate(IDSchema, ReqType.PARAMS),
            this.detail
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const search = req.query as any as Product;

            const result = await this.service.get(req.query);

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private detail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.params.id as any as number;

            const result = await this.service.find({id: id});

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}