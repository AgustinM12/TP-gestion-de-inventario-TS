import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import { env } from "../types/types"
import { PORT } from "../config/config"
import { dbConnection } from "../db/db"
import { Role } from "../models/Role"
import { User } from "../models/User"
import { DeviceState } from "../models/DeviceState"
import { DeviceType } from "../models/DeviceType"
import userRouter from "../routes/User.routes"

export class Server {
    private app: Application;
    public port: env;

    constructor() {
        this.app = express();
        this.port = PORT;

        this.dbConnection()

        this.middlewares();
        this.routes();
    }

    async dbConnection(): Promise<void> {
        await dbConnection()
        await Role.createDefaultRoles()
        await User.createDefaultAdmin()
        await DeviceState.createDefaultRoles();
        await DeviceType.createDefaultTypes()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use("/api", userRouter)
    }

    listen(): void {
        this.app.listen(this.port, () => console.log("Servidor corriendo en http://localhost:" + this.port))
    }
}
