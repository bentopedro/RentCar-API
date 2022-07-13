import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_licence,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const userData = this.repository.create({
            name,
            password,
            email,
            driver_licence,
            avatar,
            isAdmin: false,
        });

        await this.repository.save(userData);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const userEmailRecovery = await this.repository.findOne({ email });
        return userEmailRecovery;
    }

    async findByID(id: string): Promise<User | undefined> {
        const userIDRecovery = await this.repository.findOne(id);
        return userIDRecovery;
    }
}

export { UsersRepository };
