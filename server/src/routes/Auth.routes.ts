import { Router } from "express";
import { validateLogin } from "../validators/user.validation"
import { AuthControllers } from "../controllers/Auth.controllers"

const router = Router();

const { login } = new AuthControllers()

router.post("/login", validateLogin, login)

export default router
