import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export default (): ImportCategoryController => {
    const importCategoryRepository = new CategoriesRepository();
    const importCategoryUseCase = new ImportCategoryUseCase(
        importCategoryRepository
    );
    const importCategoryController = new ImportCategoryController(
        importCategoryUseCase
    );

    return importCategoryController;
};
