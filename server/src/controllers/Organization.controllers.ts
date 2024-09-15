import { Request, Response } from "express";
import { CustomError } from "../helpers/customError";
import { IOrganization } from "../models/Organization";
import { OrganizationServices } from "../services/Organization.services";
import { ResponseHandler } from "../helpers/responseHandler"
import { organizationsDB } from "../types/types";

export class OrganizationControllers {

    public getAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const organizations: organizationsDB = await new OrganizationServices().findAll()

            if (organizations !== null && organizations?.length > 0) {
                return ResponseHandler.handleResponse(res, organizations, 200)

            } else {
                throw new CustomError("No se encontraron organizaciones", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const organization: IOrganization | null = await new OrganizationServices().findById(req.params.id)

            if (organization !== null) {
                return ResponseHandler.handleResponse(res, organization, 200)

            } else {
                throw new CustomError("No se encontro la organizacion", 404);
            }

        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public setOrganization = async (req: Request, res: Response): Promise<Response> => {
        try {
            const organization: boolean = await new OrganizationServices().create(req.body)

            if (organization !== false) {
                return ResponseHandler.handleResponse(res, organization, 201, "Organizacion creada exitosamente")
            } else {
                throw new CustomError("Error al crear organizacion", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const organization: boolean = await new OrganizationServices().update(req.params.id, req.body)

            if (organization !== false) {
                return ResponseHandler.handleResponse(res, organization, 200, "Organizacion actualizada exitosamente")
            } else {
                throw new CustomError("Error al actualizar organizacion", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

    public deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const organization: boolean = await new OrganizationServices().delete(req.params.id)

            if (organization !== false) {
                return ResponseHandler.handleResponse(res, organization, 200, "Organizacion eliminada exitosamente")
            } else {
                throw new CustomError("Error al eliminar organizacion", 404);
            }
        } catch (error) {
            return ResponseHandler.handleError(error, res);
        }
    }

}