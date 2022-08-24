import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 150,
            license_plate: "A1-5457",
            fine_amount: 100,
            brand: "Brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with duplicated license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "Description Car",
                daily_rate: 150,
                license_plate: "A1-5457",
                fine_amount: 100,
                brand: "Brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_rate: 150,
                license_plate: "A1-5457",
                fine_amount: 100,
                brand: "Brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with avalaible by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Avalaible",
            description: "Description Car",
            daily_rate: 150,
            license_plate: "A2-1234",
            fine_amount: 100,
            brand: "Brand",
            category_id: "category",
        });

        // console.log(car);

        expect(car.available).toBe(true);
    });
});
