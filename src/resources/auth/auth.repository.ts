import { User } from "@/models/user.model";
import knex from "@/utils/knex/knex"

export class AuthRepository {
    public find = async (search: User, isGetPassword?: boolean): Promise<User|undefined> => {
        try {
            const select = [
                "user.id",
                "user.uuid",
                "user.username",
                "user.password",
            ];

            if (isGetPassword) {
                select.push("user.password");
            }

            const query = knex("m_users as user").select(select);

            if (search.id) {
                query.where("user.id", search.id);
            }

            if (search.uuid) {
                query.where("user.uuid", search.uuid);
            }
            
            if (search.username) {
                query.where("user.username", search.username);
            }

            query.whereNull("user.deleted_at");

            const user = await query.first();
            if (user) {
                return user;
            }
            return undefined;
        } catch (error) {
            throw error;
        }
    }
}