import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export default (): CreateSpecificationController => {
    const createSpecification = new SpecificationsRepository();
    const createSpecificationUseCase = new CreateSpecificationUseCase(
        createSpecification
    );
    const createSpecificationController = new CreateSpecificationController(
        createSpecificationUseCase
    );

    return createSpecificationController;
};
