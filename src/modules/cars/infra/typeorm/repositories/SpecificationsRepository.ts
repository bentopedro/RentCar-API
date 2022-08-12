import { getRepository, Repository } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import {
    ISpecificationsRepository,
    ISpecificationsRepositoryDTO,
} from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    // private specifications: Specification[];
    private repository: Repository<Specification>;

    public constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ISpecificationsRepositoryDTO): Promise<Specification> {
        const specification = {
            id: uuidV4(),
            name,
            description,
        };

        const spec = await this.repository.save(specification);

        return spec;
    }

    async findByName(name: string): Promise<Specification | undefined> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specs = await this.repository.findByIds(ids);
        return specs;
    }
}

export { SpecificationsRepository };
