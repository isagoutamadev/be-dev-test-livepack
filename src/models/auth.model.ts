import { User } from "./user.model";

export interface Login {
    username: string,
    password: string,
}

export interface JWT {
    user: User,
    token: string,
}

