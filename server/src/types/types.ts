import { IRole } from "../models/Role"
import { IUser } from "../models/User"
import { IDeviceType } from "../models/DeviceType"

export type env = string | undefined

export type usersDB = IUser[] | null
export type rolesDB = IRole[] | null
export type deviceTypeDB = IDeviceType[] | null