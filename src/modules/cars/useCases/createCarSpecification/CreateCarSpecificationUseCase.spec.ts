import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it("Should not be able to add a new specification to a non-existent car", () => {
        expect(async () => {
            const car_id = "12345";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 150,
            license_plate: "A1-5457",
            fine_amount: 100,
            brand: " Brand",
            category_id: "category",
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test",
            description: "test",
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const car_id = car.id!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const specifications_id = [specification.id!];
        // const specifications_id = ["test"];

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        });

        expect(specificationCars).toHaveProperty("specification");
        expect(specificationCars.specifications.length).toBe(1);
    });
});
