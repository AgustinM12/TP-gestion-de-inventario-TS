import { UserService } from "../services/User.services";
import { Request, Response } from "express";
import { usersDB } from "../types/types";
import { CustomError } from "../helpers/customError";
import { IUser } from "../models/User";
import { ResponseHandler } from "../helpers/responseHandler";

export class UserControllers {

    public getAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const users: usersDB = await new UserService().findAll()

            if (users !== null && users?.length > 0) {
                return ResponseHandler.handleResponse(res, users, 200)

            } else {
                throw new CustomError("No se encontraron usuarios", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: IUser | null = await new UserService().findById(req.params.id)

            if (user !== null) {
                return ResponseHandler.handleResponse(res, user, 200)

            } else {
                throw new CustomError("No se encontro al usuario", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getByRole = async (req: Request, res: Response): Promise<Response> => {
        try {

            const user: IUser[] | null = await new UserService().findByRole(req.params.id)

            if (user !== null) {
                return ResponseHandler.handleResponse(res, user, 200)

            } else {
                throw new CustomError("No se encontraron usuarios", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public setUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: IUser | boolean = await new UserService().create(req.body)

            if (user !== false) {
                return ResponseHandler.handleResponse(res, user, 201, "Usuario creado exitosamente")
            } else {
                throw new CustomError("Error al crear usuario", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: boolean = await new UserService().update(req.params.id, req.body)

            if (user !== false) {
                return ResponseHandler.handleResponse(res, user, 200, "Usuario actualizado exitosamente")
            } else {
                throw new CustomError("Error al actualizar usuario", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: boolean = await new UserService().delete(req.params.id)

            if (user !== false) {
                return ResponseHandler.handleResponse(res, user, 200, "Usuario eliminado exitosamente")
            } else {
                throw new CustomError("Error al eliminar usuario", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

}