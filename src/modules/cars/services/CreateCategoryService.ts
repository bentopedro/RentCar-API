import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    // DIP
    constructor(private categoriesRepository: ICategoriesRepository) {}

    // O service não pode conhecer a implementação da rota, criou-se a interface IRequest para receber os dados
    // SOLID - Single Responsibility Principle
    execute({ name, description }: IRequest): void {
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
