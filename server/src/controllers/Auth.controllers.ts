import { AuthServices } from "../services/Auth.services";
import { Request, Response } from "express";
import { CustomError } from "../helpers/customError";
import { ResponseHandler } from "../helpers/responseHandler"

export class AuthControllers {

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: any = await new AuthServices().login(req.body)

            if (user !== false) {
                return ResponseHandler.handleResponse(res, user, 200, "Login exitoso")
            } else {
                throw new CustomError("Error al logearse", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

}