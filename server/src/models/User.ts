import { model, Schema, Document, Model } from "mongoose";
import { formatDate } from "../helpers/formatDates"
import { encryptPassword } from "../helpers/bcrypt"
import { RoleEnum, Role } from "./Role";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: RoleEnum;
    dni: number;
    // !opcionales
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserModel extends Model<IUser> {
    createDefaultAdmin(): Promise<void>;
}

// * Definir el esquema de usuario
const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, ref: "roles", required: true, enum: RoleEnum },
    dni: { type: Number, required: true },

}, {
    timestamps: true,
    toJSON: { getters: true },  // Habilitar getters al convertir a JSON
    toObject: { getters: true } // Habilitar getters al convertir a objeto
});

// ! Aplicar los getters para formatear los timestamps
UserSchema.path("createdAt").get(function (value: Date) {
    return formatDate(value)
})

UserSchema.path("updatedAt").get(function (value: Date) {
    return formatDate(value)
})

// ! Middleware para encriptar la contraseña antes de guardar
UserSchema.pre<IUser>("save", async function (next) {
    const user = this

    // * Solo encriptar la contraseña si ha sido modificada o es nueva

    if (!user.isModified("password")) {
        return next();
    }

    try {
        // * Encriptar la contraseña y reemplazar con la encriptada
        user.password = await encryptPassword(user.password)
        next();
    } catch (error) {
        next(error as Error);
    }
});

// ! funcion para crear un admin por defecto
UserSchema.statics.createDefaultAdmin = async function (): Promise<void> {
    const User = this;

    // *Verificar si el rol ADMIN ya existe
    const adminRole = await Role.findOne({ name: "ADMIN" });

    if (!adminRole) {
        throw new Error('El rol ADMIN no existe. Por favor, crea los roles por defecto primero.');
    }

    // * Verificar si ya existe un usuario ADMIN
    const adminExists: IUser = await User.findOne({ name: "ADMIN" });

    if (!adminExists) {
        // * Crear un nuevo usuario "ADMIN" con la contraseña "0000"
        const admin = new User({
            name: "ADMIN",
            password: "0000",
            email: "adminEmail@gmail.com",
            role: adminRole._id, // * Asignar el ObjectId del rol ADMIN
            dni: 44876123,
        });
        await admin.save();
        console.log("Usuario ADMIN creado por defecto");
    } else {
        console.log("El usuario ADMIN ya existe.");
    }
};

// * Crear el modelo
export const User = model<IUser, IUserModel>("users", UserSchema);
