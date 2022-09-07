import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const minimumDay = 1;
        let total = 0;
        // search for rental
        const rental = await this.rentalsRepository.findById(id);

        if (!rental) {
            throw new AppError("Rental doesn't exists!");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        // Verificar o tempo de aluguel
        const dataNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (daily <= 0) {
            daily = minimumDay;
        }

        const delay = this.dateProvider.compareInDays(
            dataNow,
            rental.expected_return_date
        );

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;
        rental.updated_at = this.dateProvider.dateNow();

        // update devolution
        const closeRental = await this.rentalsRepository.create(rental);

        // O carro deve ficar novamente disponível
        await this.carsRepository.updateAvailable(rental.car_id, true);

        return closeRental;
    }
}

export { DevolutionRentalUseCase };
