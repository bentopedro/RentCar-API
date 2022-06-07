import { Specification } from "../../entities/Specification";
import {
    ISpecificationsRepository,
    ISpecificationsRepositoryDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    private static INSTANCE: SpecificationsRepository;

    constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE;
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
    findByName(name: string): Specification | undefined {
        const spec = this.specifications.find(
            (specification) => specification.name === name
        );

        return spec;
    }
    list(): Specification[] {
        return this.specifications;
    }
}

export { SpecificationsRepository };
