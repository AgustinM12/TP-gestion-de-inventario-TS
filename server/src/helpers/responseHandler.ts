import { CustomError } from "./customError";
import { Response } from "express";

export class ResponseHandler {
    public static handleResponse(
        res: Response,
        data: {} = {},
        statusCode: number = 200,
        message: string = "Operación exitosa"
    ): Response {
        return res.status(statusCode).json({
            message: message,
            status: "success",
            data: data
        });
    }

    public static handleError(error: any, res: Response): Response {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }

        return res.status(500).json({
            message: "Ocurrió un error inesperado: " + error,
            status: "error",
        });
    }
}
