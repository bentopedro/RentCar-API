import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalsUseCase: CreateRentalsUseCase;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dataAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
            dateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalsUseCase.execute({
            car_id: "A1-1213",
            user_id: "1009",
            expected_return_date: dataAdd24Hours,
            // expected_return_date: new Date(),
        });

        // console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is a another open to the same user", () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: "A1-1213",
                user_id: "1009",
                expected_return_date: dataAdd24Hours,
            });

            await createRentalsUseCase.execute({
                car_id: "A2-1213",
                user_id: "1009",
                expected_return_date: dataAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if there is a another open to the same car", () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: "A3-1213",
                user_id: "1008",
                expected_return_date: dataAdd24Hours,
            });

            await createRentalsUseCase.execute({
                car_id: "A3-1213",
                user_id: "1010",
                expected_return_date: dataAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid expected return time", () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: "A4-1213",
                user_id: "1020",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
