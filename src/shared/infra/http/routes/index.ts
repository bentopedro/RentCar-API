import express from "express";

import { userAuth } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = express();

router.use(categoriesRoutes);
router.use(specificationsRoutes);
router.use(userRoutes);
router.use("/cars", carsRoutes); // other way to call
router.use(userAuth);

export { router };
