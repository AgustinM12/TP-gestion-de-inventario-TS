import { Device, IDevice } from "../models/Device"
import { devicesDB } from "../types/types"

export class DeviceService {

    public async findOne(idDevice: string): Promise<IDevice | boolean> {
        try {

            const device: IDevice | null = await Device.findById(idDevice)

            if (device) {
                return device
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar dispositivos : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findAll(): Promise<devicesDB | boolean> {
        try {

            const devices: devicesDB = await Device.find()

            if (devices) {
                return devices
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar dispositivos : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async create(deviceData: IDevice): Promise<IDevice | boolean> {
        try {

            const device: IDevice = await Device.create(deviceData)

            if (device) {
                return device
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear dispositivo : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async update(deviceData: IDevice): Promise<boolean> {
        try {

            const device: IDevice | null = await Device.findByIdAndUpdate(deviceData._id, deviceData)

            if (device !== null) {
                return true
            } else {
                throw new Error("El dispositivo que intenta actualizar no existe");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear dispositivo : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async delete(idDevice: string): Promise<boolean> {
        try {

            const device: IDevice | null = await Device.findByIdAndDelete(idDevice)

            if (device !== null) {
                return true
            } else {
                throw new Error("El dispositivo que intenta eliminar no existe");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear dispositivo : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

} 