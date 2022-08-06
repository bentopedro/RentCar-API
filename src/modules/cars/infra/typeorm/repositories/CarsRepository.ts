import { getRepository, Repository } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id: uuidV4(),
        };

        const createdCar = await this.repository.save(car);

        return createdCar;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const license = await this.repository.findOne({ license_plate });
        return license;
    }
}

export { CarsRepository };
