import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
    const createCategoryRepository = new CategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(
        createCategoryRepository
    );
    const createCategoryController = new CreateCategoryController(
        createCategoryUseCase
    );

    return createCategoryController;
};
