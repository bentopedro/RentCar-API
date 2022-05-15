import { Router } from "express";

import { Category } from "../model/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    // const id = uuidV4();
    const category = new Category();

    Object.assign(category, {
        name,
        description,
        created_at: new Date(),
    });

    categories.push(category);

    return response.status(201).json(category);
});

export { categoriesRoutes };
