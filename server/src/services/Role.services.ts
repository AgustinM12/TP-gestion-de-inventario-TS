import { IRole, Role } from "../models/Role"
import { rolesDB } from "../types/types"

export class RoleServices {

    public async findAll(): Promise<rolesDB | boolean> {
        try {

            const roles: IRole[] = await Role.find()

            if (roles.length > 0) {
                return roles
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar roles: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

}