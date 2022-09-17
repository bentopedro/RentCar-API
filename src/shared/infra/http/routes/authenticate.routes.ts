import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/usecases/authenticateUser/AuthenticateUserController";
import { RefreshTokenControler } from "../../../../modules/accounts/usecases/refreshToken/RefreshTokenController";

const userAuth = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenControler();

userAuth.post("/sessions", authenticateUserController.handle);
userAuth.post("/refresh-token", refreshTokenController.handle);

export { userAuth };
