import { Router } from "express";

import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/categoriesRepository";

const categoriesRoutes = Router();

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    const categoriesRepository = new CategoriesRepository();

    categoriesRepository.create({
        name,
        description,
    });

    return response.status(201).send();
});

export { categoriesRoutes };
