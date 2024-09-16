import { UserControllers } from "../controllers/User.controllers"
import { Router } from "express";
import { validateCreateUser } from "../validators/user.validation"
// import {JsonWebToken} from "../helpers/jwt"

// const {verifyToken} = new JsonWebToken()

const router = Router();

const { getAll, getById, getByRole, setUser, updateUser, deleteUser } = new UserControllers()

router.get("/users", getAll)
router.get("/user/:id", getById)
router.get("/role", getByRole)

router.post("/user", validateCreateUser, setUser)

router.put("/user/:id", updateUser)

router.delete("/user/:id", deleteUser)

export default router
