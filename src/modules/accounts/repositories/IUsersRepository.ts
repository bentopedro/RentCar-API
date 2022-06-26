import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
    create({
        name,
        password,
        email,
        driver_licence,
        avatar,
    }: ICreateUserDTO): Promise<void>;

    findByEmail(email: string): Promise<User | undefined>;
}

export { IUserRepository };
