import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            refresh_token,
            user_id,
            expires_date,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };