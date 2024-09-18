import { Organization, IOrganization } from "../models/Organization";
import { organizationsDB } from "../types/types";


export class OrganizationServices {

    public async findAll(): Promise<organizationsDB> {
        try {
            const organizations: organizationsDB = await Organization.find().populate("delegate", "name").populate("manager", "name")

            if (organizations.length > 0) {
                return organizations
            } else {
                throw new Error("No existen organizaciones");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar organizaciones: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findById(idOrganization: string): Promise<IOrganization> {
        try {
            const organization: IOrganization | null = await Organization.findById(idOrganization)

            if (organization !== null) {
                return organization
            } else {
                throw new Error("No existe la  organizacion");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar organizacion: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findByUser(idUser: string): Promise<IOrganization> {
        try {
            const organization: IOrganization | null = await Organization.findOne({ manager: idUser })

            if (organization !== null) {
                return organization
            } else {
                throw new Error("No existe la  organizacion");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar organizacion: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async create(organizationData: IOrganization): Promise<boolean> {
        try {
            const organization: IOrganization = await Organization.create(organizationData)

            if (organization) {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear organizacion : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async update(idOrganization: string, organizationData: IOrganization): Promise<boolean> {
        try {
            const organization: IOrganization | null = await Organization.findByIdAndUpdate(idOrganization, organizationData)

            if (organization !== null) {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al actualizar organizacion : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async delete(idOrganization: string): Promise<boolean> {
        try {
            const organization: IOrganization | null = await Organization.findByIdAndDelete(idOrganization)

            if (organization !== null) {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al eliminar organizacion : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

}