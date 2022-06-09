import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export default (): ListSpecificationsController => {
    const createSpecification = new SpecificationsRepository();
    const listSpecificationsUseCase = new ListSpecificationsUseCase(
        createSpecification
    );
    const listSpecificationsController = new ListSpecificationsController(
        listSpecificationsUseCase
    );

    return listSpecificationsController;
};
