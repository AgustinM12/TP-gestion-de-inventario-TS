import { model, Schema, Document, Model } from "mongoose"

export enum DeviceTypeEnum {
    PORTABLE = 0,
    DESKTOP = 1,
    COMPONENT = 2,
    PERIPHERAL = 3
}

export interface IDeviceType extends Document {
    _id: DeviceTypeEnum,
    name: string,
}

const DeviceStateType = new Schema({
    _id: { type: Number, required: true, enum: DeviceTypeEnum },
    name: { type: String, required: true },

},)

export interface IDeviceTypeModel extends Model<IDeviceType> {
    createDefaultTypes(): Promise<void>;
}

// * Verificar si ya existe un usuario ADMIN
DeviceStateType.statics.createDefaultTypes = async function (): Promise<void> {

    const DeviceType = this;

    const existDeviceType: IDeviceType[] = await DeviceType.find();

    // * Verificar si ya existen estados
    if (existDeviceType.length === 0) {

        // * Crear los estados por defecto
        const DefaultTypes = [
            { _id: DeviceTypeEnum.PORTABLE, name: "PORTABLE" },
            { _id: DeviceTypeEnum.DESKTOP, name: "DESKTOP" },
            { _id: DeviceTypeEnum.COMPONENT, name: "COMPONENT" },
            { _id: DeviceTypeEnum.PERIPHERAL, name: "PERIPHERAL" },
        ];

        // * Insertar todos los TIPOS en la base de datos
        await DeviceType.insertMany(DefaultTypes);

        return console.log("TIPOS por defecto creados.");
    } else {
        return console.log("Los TIPOS ya existen en la base de datos.");
    }
};

// * Crear documento de los estados por defecto
export const DeviceType = model<IDeviceType, IDeviceTypeModel>("deviceTypes", DeviceStateType)
