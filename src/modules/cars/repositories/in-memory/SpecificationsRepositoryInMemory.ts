import { Specification } from "../../infra/typeorm/entities/Specification";
import {
    ISpecificationsRepository,
    ISpecificationsRepositoryDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ISpecificationsRepositoryDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification | undefined> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }

    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ids.includes(specification.id!)
        );

        return allSpecifications;
    }
}

export { SpecificationsRepositoryInMemory };
