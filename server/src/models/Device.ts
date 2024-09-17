import { model, Schema, Document, ObjectId } from "mongoose"
import { formatDate } from "../helpers/formatDates"
import { DeviceTypeEnum } from "../models/DeviceType"
import { DeviceStateEnum } from "../models/DeviceState"

export interface IDevice extends Document {
    name: string,
    defectiveDetails: string[],
    observationsRepair: object[],
    tradeMark: string,
    reparationCost: number,
    type: number,
    state: number,
    technician: ObjectId,
    organization: ObjectId,
    // !opcionales
    createdAt?: string,
    updatedAt?: string
}

const DeviceSchema = new Schema({

    name: { type: String, required: true },
    defectiveDetails: { type: [String], require: true },
    observationsRepair: { type: Number, required: false, default: null },
    tradeMark: { type: String, required: true },
    reparationCost: { type: Number, required: false, default: null },
    type: {
        type: Number,
        required: true,
        ref: "deviceTypes",
        enum: DeviceTypeEnum,
    },
    state: {
        type: Number,
        required: true,
        ref: "deviceStates",
        enum: DeviceStateEnum,
        default: 0
    },
    technician: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false,
        default: null
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organizations',
        required: true
    },

}, {
    timestamps: true,
    toJSON: { getters: true },  // Habilitar getters al convertir a JSON
    toObject: { getters: true } // Habilitar getters al convertir a objeto
})

// Aplicar los getters para formatear los timestamps
DeviceSchema.path("createdAt").get(function (value: Date) {
    return formatDate(value)
})

DeviceSchema.path("updatedAt").get(function (value: Date) {
    return formatDate(value)
})

export const Device = model<IDevice>("device", DeviceSchema)
