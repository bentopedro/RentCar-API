import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUserRepository
    ) {}

    async execute({
        name,
        username,
        password,
        email,
        driver_licence,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByUsername(
            username
        );

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        await this.usersRepository.create({
            name,
            username,
            password,
            email,
            driver_licence,
            avatar,
        });
    }
}

export { CreateUserUseCase };
