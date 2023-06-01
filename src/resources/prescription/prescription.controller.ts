import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { Prescription } from '@/models/prescription.model';
import { PrescriptionSchema } from '@/schemas/prescription.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { PrescriptionService } from './prescription.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';
import { IDSchema } from '@/schemas/global.schema';
import { PrescriptionProductController } from '../prescription-product/prescription-product.controller';

export class PrescriptionController implements Controller {
    public path = 'prescriptions';
    public router = Router();
    private service = new PrescriptionService();
    private prescriptionProductController = new PrescriptionProductController();

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
        
        this.router.post(
            '/',
            authMiddleware(),
            validate(PrescriptionSchema, ReqType.BODY),
            this.create
        );
        
        this.router.get(
            '/:id',
            authMiddleware(),
            validate(IDSchema, ReqType.PARAMS),
            this.detail
        );
        
        this.router.use(
            `/:prescription_id/${this.prescriptionProductController.path}`,
            this.prescriptionProductController.router
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const result = await this.service.get(req.query as any);

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { auth } = res.app.locals;
            const result = await this.service.create(req.body as any, auth);

            return response.created(result, res);
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
            const { id } = req.params;
            const result = await this.service.find({id: id as any});

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}