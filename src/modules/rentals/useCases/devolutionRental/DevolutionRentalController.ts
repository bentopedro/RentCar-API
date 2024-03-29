import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.body;

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase
        );

        const devolutionRental = await devolutionRentalUseCase.execute({
            id,
            user_id,
        });

        return response.status(201).json(devolutionRental);
    }
}

export { DevolutionRentalController };
