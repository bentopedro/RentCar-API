import { Router } from "express";

import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/categoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    categoriesRepository.create({
        name,
        description,
    });

    return response.status(201).send();
});

categoriesRoutes.get("/categories", (request, response) => {
    return response.json(categoriesRepository.list());
});

export { categoriesRoutes };
