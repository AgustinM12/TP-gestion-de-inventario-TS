import { Organization, IOrganization } from "../models/Organization";
import { organizationsDB } from "../types/types";


export class OrganizationServices {

    public async find(): Promise<organizationsDB | boolean> {
        try {
            const organizations: organizationsDB = await Organization.find()

            if (organizations.length > 0) {
                return organizations
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar organizaciones: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findOne(idOrganization: string): Promise<IOrganization | boolean> {
        try {
            const organization: IOrganization | null = await Organization.findById(idOrganization)

            if (organization !== null) {
                return organization
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar organizacion: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async create(organizationData: IOrganization): Promise<IOrganization> {
        try {
            const organization: IOrganization = await Organization.create(organizationData)

            return organization

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear organizacion : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async update(organizationData: IOrganization): Promise<IOrganization | boolean> {
        try {
            const organization: IOrganization | null = await Organization.findByIdAndUpdate(organizationData._id, organizationData)

            if (organization !== null) {

                return organization
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