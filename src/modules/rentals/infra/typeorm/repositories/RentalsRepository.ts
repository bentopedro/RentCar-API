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
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        const findRentalByCar = this.repository.findOne(car_id);
        // const findRentalByCar = this.repository.query(
        //     `select * from rentals where car_id = "${car_id}" and end_date = "" `
        // );

        return findRentalByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        const findRentalByUser = this.repository.findOne(user_id);
        // const findRentalByUser = this.repository.query(
        //     `select * from rentals where user_id = "${user_id}" and end_date = "" `
        // );

        return findRentalByUser;
    }
}

export { RentalsRepository };
