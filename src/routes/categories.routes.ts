import { Router } from "express";
import multer from "multer";

// import createCategoryController from "../modules/cars/useCases/createCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
// import importCategoryController from "../modules/cars/useCases/importCategory";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
// import listCategoriesController from "../modules/cars/useCases/listCategories";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/categories", createCategoryController.handle);

categoriesRoutes.get("/categories", listCategoriesController.handle);

categoriesRoutes.post(
    "/categories/import",
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
