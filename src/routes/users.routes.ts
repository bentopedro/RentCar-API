import { Router } from "express";

import { CreateUsersController } from "../modules/accounts/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUsersController();

userRoutes.post("/users", createUserController.handle);

export { userRoutes };
