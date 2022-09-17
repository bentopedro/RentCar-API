import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
// import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    const userTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        // Verificar se o token é válido
        // const decoded = verify(token, "097c613ab89c17668da89e578d4aef14");
        // console.log(decoded);

        // criou-se uma interface para forçar o retorno do method verify, pois so precisamos do sub para autenticação
        // No caso, precisarmos as datas de inicio e fim, é só colocar na desestruturação as variaveis que as corespondem
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token // Utilizou-se o refresh token ao contrário do secret token
        ) as IPayload;

        // verificar se o usuário existe na BD
        // const usersRepository = new UsersRepository();
        // const user = await usersRepository.findByID(user_id);

        // Utilizou-se o refresh token ao contrário do secret token
        const user = await userTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError("User doesn't exist!", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}
