import { Request, Response } from "express";
import { CustomError } from "../helpers/customError";
import { ResponseHandler } from "../helpers/responseHandler"
import { IDevice } from "../models/Device";
import { DeviceService } from "../services/Device.Services";
import { devicesDB, deviceStatesDB, deviceTypesDB } from "../types/types";

export class DeviceControllers {

    public getAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const devices: devicesDB = await new DeviceService().findAll()

            if (devices !== null && devices?.length > 0) {
                return ResponseHandler.handleResponse(res, devices, 200)

            } else {
                throw new CustomError("No se encontraron dispositivos", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getAllTypes = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const types: deviceTypesDB = await new DeviceService().findTypes()

            if (types !== null && types?.length > 0) {
                return ResponseHandler.handleResponse(res, types, 200)

            } else {
                throw new CustomError("No se encontraron tipos de dispositivos", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getAllStates = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const states: deviceStatesDB = await new DeviceService().findStates()

            if (states !== null && states?.length > 0) {
                return ResponseHandler.handleResponse(res, states, 200)

            } else {
                throw new CustomError("No se encontraron dispositivos", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const device: IDevice | null = await new DeviceService().findById(req.params.id)

            if (device !== null) {
                return ResponseHandler.handleResponse(res, device, 200)

            } else {
                throw new CustomError("No se encontro al dispositivo", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getByState = async (req: Request, res: Response): Promise<Response> => {
        try {
            const devices: devicesDB = await new DeviceService().findByState(req.params.id)

            if (devices !== null) {
                return ResponseHandler.handleResponse(res, devices, 200)

            } else {
                throw new CustomError("No se encontro al dispositivo", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    // public getByType = async (req: Request, res: Response): Promise<Response> => {
    //     try {
    //         const device: IDevice | null = await new DeviceService().(req.params.id)

    //         if (device !== null) {
    //             return ResponseHandler.handleResponse(res, device, 200)

    //         } else {
    //             throw new CustomError("No se encontro al dispositivo", 404);
    //         }

    //     } catch (error) {
    //         return ResponseHandler.handleError(error, res);
    //     }
    // }

    public setDevice = async (req: Request, res: Response): Promise<Response> => {
        try {
            const device: boolean = await new DeviceService().create(req.body)

            if (device !== false) {
                return ResponseHandler.handleResponse(res, device, 201, "Dispositivo creado exitosamente")
            } else {
                throw new CustomError("Error al crear dispositivo", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public updateDevice = async (req: Request, res: Response): Promise<Response> => {
        try {
            const device: boolean = await new DeviceService().update(req.params.id, req.body)

            if (device !== false) {
                return ResponseHandler.handleResponse(res, device, 200, "Dispositivo actualizado exitosamente")
            } else {
                throw new CustomError("Error al actualizar dispositivo", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public deleteDevice = async (req: Request, res: Response): Promise<Response> => {
        try {
            const device: boolean = await new DeviceService().delete(req.params.id)

            if (device !== false) {
                return ResponseHandler.handleResponse(res, device, 200, "Dispositivo eliminada exitosamente")
            } else {
                throw new CustomError("Error al eliminar dispositivo", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

}