import { Router } from "express";
import { OrganizationControllers } from "../controllers/Organization.controllers"
import { JsonWebToken } from "../helpers/jwt"

const { verifyToken, verifyManagerOrManager } = new JsonWebToken()

const router = Router();

const { getAll, getById, getByUser, setOrganization, updateOrganization, deleteOrganization } = new OrganizationControllers()

router.get("/organizations", verifyToken, getAll)
router.get("/organization/:id", verifyToken, getById)
router.get("/organizationUser/:id", verifyToken, getByUser)

router.post("/organization", verifyToken, verifyManagerOrManager, setOrganization)

router.put("/organization/:id", verifyToken, updateOrganization)

router.delete("/organization/:id", verifyToken, deleteOrganization)

export default router
