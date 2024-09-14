import { model, Schema, Document, ObjectId } from "mongoose"
import { formatDate } from "../helpers/formatDates"

export interface IDevice extends Document {
    name: string,
    details: string[],
    tradeMark: string,
    reparationCost: number,
    type: ObjectId,
    state: ObjectId,
    technician: ObjectId,
    organization: ObjectId,
    // !opcionales
    createdAt?: string,
    updatedAt?: string
}

const DeviceSchema = new Schema({

    name: { type: String, required: true },
    details: { type: [String], require: true },
    tradeMark: { type: String, required: true },
    reparationCost: { type: Number, required: true },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'deviceTypes',
        required: true
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'devices',
        required: true
    }],
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    delegate: {
        type: Schema.Types.ObjectId,
        ref: 'users',
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

export const Device = model<IDevice>("organizations", DeviceSchema)
