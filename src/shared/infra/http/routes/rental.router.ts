import { Router } from "express";

import { CreateRentalsController } from "../../../../modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalsController.handle);
rentalRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

rentalRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalRoutes };
