import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findByAvailable(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase };
