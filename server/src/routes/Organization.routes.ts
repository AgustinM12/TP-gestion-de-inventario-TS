import { Router } from "express";
import { OrganizationControllers } from "../controllers/Organization.controllers"
// import {JsonWebToken} from "../helpers/jwt"

// const {verifyToken} = new JsonWebToken()

const router = Router();

const { getAll, getById, setOrganization, updateOrganization, deleteOrganization } = new OrganizationControllers()

router.get("/organizations", getAll)
router.get("/organization/:id", getById)

router.post("/organization", setOrganization)

router.put("/organization/:id", updateOrganization)

router.delete("/organization/:id", deleteOrganization)

export default router
