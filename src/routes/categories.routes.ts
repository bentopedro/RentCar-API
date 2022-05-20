import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/categoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/categories", (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRoutes };
