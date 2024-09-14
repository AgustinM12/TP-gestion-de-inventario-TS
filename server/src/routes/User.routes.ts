import { UserControllers } from "../controllers/User.controllers"
import { Router } from "express";

const router = Router();

const { getAll, getById, getByRole, setUser, updateUser, deleteUser } = new UserControllers()

router.get("/users", getAll)
router.get("/user/:id", getById)
router.get("/role", getByRole)

router.post("/user", setUser)

router.put("/user/:id", updateUser)

router.delete("/user/:id", deleteUser)

export default router
