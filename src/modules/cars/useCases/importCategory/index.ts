import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(
    importCategoryRepository
);
const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { importCategoryController };
