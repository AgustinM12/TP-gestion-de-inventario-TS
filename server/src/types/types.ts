import { IRole } from "../models/Role"
import { IUser } from "../models/User"
import { IOrganization } from "../models/Organization"
import { IDevice } from "../models/Device"
import { IDeviceType } from "../models/DeviceType"
import { IDeviceState } from "../models/DeviceState"

export type env = string | undefined

export type usersDB = IUser[] | null
export type rolesDB = IRole[] | null
export type deviceTypesDB = IDeviceType[] | null
export type organizationsDB = IOrganization[] | null
export type devicesDB = IDevice[] | null
export type deviceStatesDB = IDeviceState[] | null