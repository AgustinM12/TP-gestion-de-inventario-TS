import { Device, IDevice } from "../models/Device"
import { DeviceType } from "../models/DeviceType"
import { DeviceState } from "../models/DeviceState"
import { devicesDB, deviceTypesDB, deviceStatesDB } from "../types/types"

export class DeviceService {

    public async findById(idDevice: string): Promise<IDevice> {
        try {

            const device: IDevice | null = await Device.findById(idDevice).populate("type", "name").populate("organization", "name").populate("technician", "name")

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

            const devices: devicesDB = await Device.find().populate("type", "name").populate("organization", "name").populate("technician", "name")

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

    public async findTypes(): Promise<deviceTypesDB> {
        try {

            const types: deviceTypesDB = await DeviceType.find()

            if (types !== null) {
                return types
            } else {
                throw new Error("No existen tipos de dispositivos");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar los tipos de dispositivos : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findStates(): Promise<deviceStatesDB> {
        try {

            const states: deviceStatesDB = await DeviceState.find()

            if (states !== null) {
                return states
            } else {
                throw new Error("No existen tipos de dispositivos");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar los tipos de dispositivos : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findByState(idState: string): Promise<devicesDB> {
        try {

            const devices: devicesDB | null = await Device.find({ state: idState })

            if (devices !== null) {
                return devices
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