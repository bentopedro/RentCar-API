import { Router } from "express";

// import createSpecificationController from "../modules/cars/useCases/createSpecification";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
// import listSpecificationsController from "../modules/cars/useCases/listSpecifications";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

// specificationsRoutes.post("/specifications", (request, response) => {
//     return createSpecificationController().handle(request, response);
// });
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
    "/specifications",
    createSpecificationController.handle
);

specificationsRoutes.get(
    "/specifications",
    listSpecificationsController.handle
);

export { specificationsRoutes };
