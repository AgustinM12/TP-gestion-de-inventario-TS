import { model, Schema, Document, Model } from "mongoose"

export enum DeviceStateEnum {
    ON_TRAVEL = 0,
    STORED = 1,
    ON_MAINTENANCE = 2,
    READY = 3,
    RECIVED = 4,
}

export interface IDeviceState extends Document {
    _id: DeviceStateEnum,
    name: string,
}

const DeviceStateSchema = new Schema({
    _id: { type: Number, required: true, enum: DeviceStateEnum }, // El _id será el valor del enum
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
            { _id: DeviceStateEnum.RECIVED, name: "RECIVED" },
            { _id: DeviceStateEnum.ON_TRAVEL, name: "ON_TRAVEL" },
            { _id: DeviceStateEnum.ON_MAINTENANCE, name: "ON_MAINTENANCE" },
            { _id: DeviceStateEnum.STORED, name: "STORED" },
            { _id: DeviceStateEnum.READY, name: "READY" },
        ];

        // * Insertar todos los roles en la base de datos
        await DeviceState.insertMany(defaultRoles);

        return console.log("ESTADOS por defecto creados.");
    } else {
        return console.log("Los ESTADOS ya existen en la base de datos.");
    }
};

// * Crear documento de los estados por defecto
export const DeviceState = model<IDeviceState, IDeviceStateModel>("deviceStates", DeviceStateSchema)
