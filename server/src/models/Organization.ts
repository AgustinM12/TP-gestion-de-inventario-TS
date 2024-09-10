import { model, Schema, Document, ObjectId } from "mongoose"
import { formatDate } from "../helpers/formatDates"

export interface IOrganization extends Document {
    name: string,
    location: string,
    headMaster: ObjectId,
    delegate: ObjectId,
    devices: ObjectId[],
    // !opcionales
    createdAt?: string,
     updatedAt?: string
}

const OrganizationSchema = new Schema({

    name: { type: String, required: true },
    location: { type: String, required: true },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'devices',
        required: true
    }],
    headMaster: {
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
OrganizationSchema.path("createdAt").get(function (value: Date) {
    return formatDate(value)
})

OrganizationSchema.path("updatedAt").get(function (value: Date) {
    return formatDate(value)
})

export const Organization = model<IOrganization>("organizations", OrganizationSchema)
