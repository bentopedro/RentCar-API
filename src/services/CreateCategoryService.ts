import { CategoriesRepository } from "../repositories/categoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    // DIP
    constructor(private categoriesRepository: CategoriesRepository) {}

    // O service não pode conhecer a implementação da rota, se criou a interface IRequest
    // SOLID - Single Responsibility Principle
    execute({ name, description }: IRequest) {
        // instance repository, but always reset the Array of categories. solution is DIP - Dependency Invertion Principle
        // const categoriesRepository = new CategoriesRepository();

        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists");
        }

        this.categoriesRepository.create({
            name,
            description,
        });
    }
}

export { CreateCategoryService };
