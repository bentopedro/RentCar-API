import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
    create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
