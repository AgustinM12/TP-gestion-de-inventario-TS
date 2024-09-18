import { Router } from "express";
import { UserControllers } from "../controllers/User.controllers"
import { validateCreateUser } from "../validators/user.validation"
import { JsonWebToken } from "../helpers/jwt"

const { verifyToken } = new JsonWebToken()

const router = Router();

const { getAll, getById, getByRole, setUser, updateUser, deleteUser } = new UserControllers()

router.get("/users", verifyToken, getAll)
router.get("/user/:id", verifyToken, getById)
router.get("/role/:id", verifyToken, getByRole)

router.post("/user", validateCreateUser, setUser)

router.put("/user/:id", verifyToken, updateUser)

router.delete("/user/:id", verifyToken, deleteUser)

export default router
