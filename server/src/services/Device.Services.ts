import { Device, IDevice } from "../models/Device"
import { devicesDB } from "../types/types"

export class DeviceService {

    public async findById(idDevice: string): Promise<IDevice> {
        try {

            const device: IDevice | null = await Device.findById(idDevice)

            if (device !== null) {
                return device
            } else {
                throw new Error("No existe el dispositivo");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar dispositivos : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findAll(): Promise<devicesDB> {
        try {

            const devices: devicesDB = await Device.find()

            if (devices !== null) {
                return devices
            } else {
                throw new Error("No existen dispositivos");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar dispositivos : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async create(deviceData: IDevice): Promise<boolean> {
        try {

            const device: IDevice = await Device.create(deviceData)

            if (device) {
                return true
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

    public async update(idDevice: string, deviceData: IDevice): Promise<boolean> {
        try {

            const device: IDevice | null = await Device.findByIdAndUpdate(idDevice, deviceData)

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