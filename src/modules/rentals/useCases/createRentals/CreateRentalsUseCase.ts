import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateRentalDTO } from "../../infra/dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class CreateRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const minimumHours = 24;
        // Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo usuário
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is unavailable!");
        }

        // Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo carro
        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for this user!");
        }

        // O aluguel deve ter duração mínima de 24 horas.
        // const expectedReturnDateFormat = dayjs(expected_return_date)
        //     .utc()
        //     .local()
        //     .format();
        //
        // const dataNow = dayjs().utc().local().format();
        const dataNow = this.dateProvider.dateNow();

        // const compareDate = dayjs(expectedReturnDateFormat).diff(
        //     dataNow,
        //     "hours"
        // );
        // const compareDate = dayjs(expected_return_date).diff(dayjs(), "hours");
        const compareDate = this.dateProvider.compareInHours(
            dataNow,
            expected_return_date
        );
        // console.log("Compare date ", compareDate);

        if (compareDate < minimumHours) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalsUseCase };
