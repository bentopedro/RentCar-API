import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const userData = this.repository.create({
            name,
            password,
            email,
            driver_license,
            isAdmin: false,
            avatar,
            id,
        });

        await this.repository.save(userData);
    }

    async findByEmail(email: string): Promise<User> {
        const userEmailRecovery = await this.repository.findOne({ email });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return userEmailRecovery!;
    }

    async findByID(id: string): Promise<User> {
        const userIDRecovery = await this.repository.findOneOrFail(id);
        return userIDRecovery;
    }
}

export { UsersRepository };
