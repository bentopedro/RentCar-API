import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, username, password, email, driver_licence, avatar } =
                request.body;

            const createUsersUseCase = container.resolve(CreateUserUseCase);

            await createUsersUseCase.execute({
                name,
                username,
                password,
                email,
                driver_licence,
                avatar,
            });

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({ error: "User already exists" });
        }
    }
}

export { CreateUsersController };
