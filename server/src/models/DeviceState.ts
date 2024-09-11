import { model, Schema, Document, Model } from "mongoose"

export interface IDeviceState extends Document {
    name: string,
}

const DeviceStateSchema = new Schema({

    name: { type: String, required: true },

},)

export interface IDeviceStateModel extends Model<IDeviceState> {
    createDefaultRoles(): Promise<void>;
}

// * Verificar si ya existe un usuario ADMIN
DeviceStateSchema.statics.createDefaultRoles = async function (): Promise<void> {
    
    const DeviceState = this;

    const existDeviceState: IDeviceState[] = await DeviceState.find();

    // * Verificar si ya existen estados
    if (existDeviceState.length === 0) {

        // * Crear los estados por defecto
        const defaultRoles = [
            { name: "RECIVED" },
            { name: "ON_TRAVEL" },
            { name: "ON_MAINTENANCE" },
            { name: "READY" }
        ];

        // * Insertar todos los roles en la base de datos
        await DeviceState.insertMany(defaultRoles);

        return console.log("Estados por defecto creados.");
    } else {
        return console.log("Los estados ya existen en la base de datos.");
    }
};

// * Crear documento de los estados por defecto
export const DeviceState = model<IDeviceState, IDeviceStateModel>("deviceStates", DeviceStateSchema)
