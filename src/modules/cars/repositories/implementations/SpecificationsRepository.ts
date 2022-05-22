import { Specification } from "../../model/Specification";
import {
    ISpecificationsRepository,
    ISpecificationsRepositoryDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    findByName(name: string): Specification | undefined {
        const spec = this.specifications.find(
            (specification) => specification.name === name
        );

        return spec;
    }
    list(): Specification[] {
        return this.specifications;
    }
    create({ name, description }: ISpecificationsRepositoryDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }
}

export { SpecificationsRepository };
