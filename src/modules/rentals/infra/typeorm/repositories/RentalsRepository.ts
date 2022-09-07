import { getRepository, Repository } from "typeorm";

import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        const findRentalByCar = this.repository.findOne({
            where: { car_id, end_date: null },
        });

        return findRentalByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        const findRentalByUser = this.repository.findOne({
            where: { user_id, end_date: null },
        });

        return findRentalByUser;
    }

    async findById(id: string): Promise<Rental | undefined> {
        const rental = this.repository.findOne(id);
        return rental;
    }
}

export { RentalsRepository };
