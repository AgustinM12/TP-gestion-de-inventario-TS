import { model, Schema, Document, Model } from "mongoose"

export enum RoleEnum {
    ADMIN = 0,
    DELEGATE = 1,
    MANAGER = 2,
    MAINTENANCE = 3
}

export interface IRole extends Document {
    _id: RoleEnum,
    name: string,
}

const RoleSchema = new Schema<IRole>({
    _id: { type: Number, required: true, enum: RoleEnum }, // El _id será el valor del enum
    name: { type: String, required: true },  // El name será una cadena de texto
});

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
            { _id: RoleEnum.ADMIN, name: "ADMIN" },
            { _id: RoleEnum.DELEGATE, name: "DELEGATE" },
            { _id: RoleEnum.MANAGER, name: "MANAGER" },
            { _id: RoleEnum.MAINTENANCE, name: "MAINTENANCE" }
        ];

        // * Insertar todos los roles en la base de datos
        await Role.insertMany(defaultRoles);

        return console.log("ROLES por defecto creados.");
    } else {
        return console.log("Los ROLES ya existen en la base de datos.");
    }
};

// * Crear documento de los roles por defecto
export const Role = model<IRole, IRoleModel>("roles", RoleSchema)
