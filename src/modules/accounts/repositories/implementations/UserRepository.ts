import { getRepository, Repository } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUsersRepository";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.repository.findOne(username);

        return user;
    }

    async create({
        name,
        username,
        password,
        email,
        driver_licence,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id: uuidV4(),
            name,
            username,
            password,
            email,
            driver_licence,
            avatar,
            isAdmin: false,
        });

        await this.repository.save(user);
    }
}

export { UserRepository };
