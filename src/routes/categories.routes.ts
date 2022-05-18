import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/categoriesRepository";
import { PostgreCategoriesRepository } from "../modules/cars/repositories/PostgreCategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();
// const categoriesRepository = new PostgreCategoriesRepository(); Implementar o repositório para o PostgreSQL

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );
    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/categories", (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRoutes };
