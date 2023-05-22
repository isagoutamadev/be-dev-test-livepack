import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { LoginSchema } from '@/schemas/auth.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { AuthService } from '@/resources/auth/auth.service';
import HttpException from '@/utils/exceptions/http.exception';
import { JWT } from '@/models/auth.model';

// const service = new AuthService();

export class AuthController implements Controller {
    public path = '';
    public router = Router();
    private service = new AuthService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(
            '/login',
            validate(LoginSchema, ReqType.BODY),
            this.login
        );
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { body } = req;

            const result = await this.service.login(body);

            return response.ok<JWT>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}
