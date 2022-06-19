import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
    create({
        name,
        username,
        password,
        email,
        driver_licence,
        avatar,
    }: ICreateUserDTO): Promise<void>;

    findByUsername(name: string): Promise<User | undefined>;
}

export { IUserRepository };
