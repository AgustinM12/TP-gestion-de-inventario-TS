import { model, Schema, Document, Model } from "mongoose"

export interface IRole extends Document {
    name: string,
}

const RoleSchema = new Schema({

    name: { type: String, required: true },

},)

export interface IRoleModel extends Model<IRole> {
    createDefaultRoles(): Promise<void>;
}

// * Verificar si ya existe un usuario ADMIN
RoleSchema.statics.createDefaultRoles = async function (): Promise<void> {
    
    const Role = this;

    const existRoles: IRole[] = await Role.find();

    // * Verificar si ya existen roles
    if (existRoles.length === 0) {

        // * Crear los roles por defecto
        const defaultRoles = [
            { name: "ADMIN" },
            { name: "DELEGATE" },
            { name: "MANAGER" },
            { name: "MAINTENANCE" }
        ];

        // * Insertar todos los roles en la base de datos
        await Role.insertMany(defaultRoles);

        return console.log("Roles por defecto creados.");
    } else {
        return console.log("Los roles ya existen en la base de datos.");
    }
};

// * Crear documento de los roles por defecto
export const Role = model<IRole, IRoleModel>("roles", RoleSchema)

