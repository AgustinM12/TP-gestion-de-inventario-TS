import { IDeviceType, DeviceType } from "../models/DeviceType"
import { deviceTypeDB } from "../types/types"

export class DeviceTypeServices {

    public async findAll(): Promise<deviceTypeDB | boolean> {
        try {

            const deviceTypes: IDeviceType[] = await DeviceType.find()

            if (deviceTypes.length > 0) {
                return deviceTypes
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar tipos de dispositivo: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

}