import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { PrescriptionProduct } from '@/models/prescription-product.model';
import { PrescriptionProductSchema, UpdatePrescriptionProductSchema } from '@/schemas/prescription-product.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { PrescriptionProductService } from './prescription-product.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';
import { ProductIDSchema } from '@/schemas/product.schema';
import { PrescriptionParamsSchema } from '@/schemas/prescription.schema';

export class PrescriptionProductController implements Controller {
    public path = '/';
    public router = Router({mergeParams: true});
    private service = new PrescriptionProductService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(
            '/',
            authMiddleware(),
            validate(PrescriptionProductSchema, ReqType.BODY),
            this.create
        );
        
        this.router.put(
            '/:product_id',
            authMiddleware(),
            validate(PrescriptionParamsSchema, ReqType.PARAMS),
            validate(UpdatePrescriptionProductSchema, ReqType.BODY),
            this.update
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { auth } = res.app.locals;
            const { prescription_id } = req.params;

            const result = await this.service.create({
                prescription_id,
                ...req.body,
            }, auth);

            return response.created(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { auth } = res.app.locals;
            const { prescription_id, product_id } = req.params;

            const result = await this.service.update({
                prescription_id,
                product_id,
                ...req.body,
            }, auth);

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}