import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const createSpecification = SpecificationsRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
    createSpecification
);
const listSpecificationsController = new ListSpecificationsController(
    listSpecificationsUseCase
);

export { listSpecificationsController };
