import { Login } from "@/models/auth.model";
import { User } from "@/models/user.model";
import AuthHelper from "@/helpers/auth.helper";
import { JWT } from "@/models/auth.model";
import { AuthRepository } from "./auth.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class AuthService {
    private repository = new AuthRepository();
    public login = async (login: Login): Promise<JWT> => {
        try {            
            const data = await this.repository.find({username: login.username}, true);
            
            if (!data) {
                throw new HttpException("Username atau password salah", ResponseCode.UNPROCESSABLE_ENTITY);
            }

            if (!AuthHelper.compare(login.password, data.password || "")) {
                throw new HttpException("Username atau password salah", ResponseCode.UNPROCESSABLE_ENTITY);
            }

            delete data.password;

            return {
                token: AuthHelper.jwtEncode({uuid: data.uuid}),
                user: data
            }  

        } catch (error) {
            throw error;
        }
    }
}