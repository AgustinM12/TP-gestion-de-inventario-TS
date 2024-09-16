import { Router } from "express";
import { DeviceControllers } from "../controllers/Device.controllers"
// import {JsonWebToken} from "../helpers/jwt"

// const {verifyToken} = new JsonWebToken()

const router = Router();

const { getAll, getById, setDevice, updateDevice, deleteDevice } = new DeviceControllers()

router.get("/devices", getAll)
router.get("/device/:id", getById)

router.post("/device", setDevice)

router.put("/device/:id", updateDevice)
router.put("/deviceObservations/:id", updateDevice)
router.put("/deviceState/:id", updateDevice)

router.delete("/device/:id", deleteDevice)

export default router
