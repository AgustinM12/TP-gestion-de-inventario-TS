import { Router } from "express";
import { validateLogin } from "../validators/user.validation"
import { AuthControllers } from "../controllers/Auth.controllers"
// import {JsonWebToken} from "../helpers/jwt"

// const {verifyToken} = new JsonWebToken()

const router = Router();

const { login } = new AuthControllers()

router.post("/login", validateLogin, login)

export default router
