import { Router } from "express";
import { DeviceControllers } from "../controllers/Device.controllers"
import { JsonWebToken } from "../helpers/jwt"

const { verifyToken } = new JsonWebToken()

const router = Router();

const { getAll, getById, setDevice, updateDevice, deleteDevice, getAllStates, getAllTypes, getByState } = new DeviceControllers()

router.get("/devices", verifyToken, getAll)
router.get("/device/:id", verifyToken, getById)
router.get("/deviceStates", verifyToken, getByState)

router.get("/types", verifyToken, getAllTypes)
router.get("/states", verifyToken, getAllStates)

router.post("/device", verifyToken, setDevice)

router.put("/device/:id", verifyToken, updateDevice)
router.put("/deviceObservations/:id", verifyToken, updateDevice)
router.put("/deviceState/:id", verifyToken, updateDevice)

router.delete("/device/:id", verifyToken, deleteDevice)

export default router
