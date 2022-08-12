import { getRepository, Repository } from "typeorm";
// import { v4 as uuidV4 } from "uuid";

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
        specification,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specification,
            id,
            // id: uuidV4(),
        };

        const createdCar = await this.repository.save(car);

        return createdCar;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const license = await this.repository.findOne({ license_plate });
        return license;
    }

    async findByAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("car")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("car.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("car.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("car.category_id = :category_id", {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return car!;
    }
}

export { CarsRepository };
