import { Request, Response, NextFunction } from "express";
import response from "@/helpers/response.helper";
import AuthHelper from "@/helpers/auth.helper";
import { AuthRepository } from "@/resources/auth/auth.repository";

const authRepository = new AuthRepository();

export function authMiddleware(isDontGetDetail?: boolean) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const authorization = req.headers.authorization || "";
            let token = authorization.replace("Basic ", "");
            token = token.replace("Bearer ", "");
            const decoded = AuthHelper.jwtDecode(token);

            if (isDontGetDetail) {
                res.app.locals.auth = decoded;

                return next();
            }

            // @ts-ignore
            const auth = await authRepository.find({uuid: decoded.uuid});

            if (!auth) {
                return response.unauthorized({}, res, "Your user id is not registered in our database");
            }
            res.app.locals.auth = auth;

            return next();
        }
        catch (err: any) {
            console.log(err);
            
            return response.unauthorized({}, res);
        }
    }
}