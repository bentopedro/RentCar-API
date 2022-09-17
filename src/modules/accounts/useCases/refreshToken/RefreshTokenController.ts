import { Request, Response } from "express";

class RefreshTokenControler {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.body;

        return response.send();
    }
}

export { RefreshTokenControler };
