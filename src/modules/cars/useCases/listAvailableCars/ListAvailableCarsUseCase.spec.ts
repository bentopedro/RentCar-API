import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });
    it("Should be able to list car all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "Car Description",
            daily_rate: 130.0,
            license_plate: "LDA-4312",
            fine_amount: 90,
            brand: "Brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by Name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car available",
            description: "Car Description Available by N",
            daily_rate: 110.0,
            license_plate: "A1-1234",
            fine_amount: 70,
            brand: "Brand Name",
            category_id: "category_available_id",
        });

        const cars = await listAvailableCarUseCase.execute({
            name: "Car available",
        });

        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by Brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car available",
            description: "Car Description Available by N",
            daily_rate: 110.0,
            license_plate: "A1-1234",
            fine_amount: 70,
            brand: "Brand Name",
            category_id: "category_available_id",
        });

        const cars = await listAvailableCarUseCase.execute({
            brand: "Car Description Available by N",
        });

        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by Category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car available",
            description: "Car Description Available by N",
            daily_rate: 110.0,
            license_plate: "A1-1234",
            fine_amount: 70,
            brand: "Brand Name",
            category_id: "category_available_id",
        });

        const cars = await listAvailableCarUseCase.execute({
            brand: "Car Description Available by N",
        });

        expect(cars).toEqual([car]);
    });
});
