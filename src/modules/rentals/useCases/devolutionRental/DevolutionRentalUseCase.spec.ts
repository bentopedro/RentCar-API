import { DayjsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "../createRentals/CreateRentalsUseCase";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let createRentalsUseCase: CreateRentalsUseCase;

describe("Devolution Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
            dateProvider,
            carsRepositoryInMemory
        );
        devolutionRentalUseCase = new DevolutionRentalUseCase(
            rentalsRepositoryInMemory,
            dateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to devolution a rental", async () => {
        // const rental = await createRentalsUseCase.execute({
        //     car_id: "A1-1213",
        //     user_id: "1009",
        //     // expected_return_date: dataAdd24Hours,
        //     expected_return_date: new Date(),
        // });
        // await devolutionRentalUseCase.execute();
        console.log("devolution rental");
    });
});
