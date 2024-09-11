import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import { env } from "../types/types"
import { PORT } from "../config/config"
import { dbConnection } from "../db/db"
import { Role } from "../models/Role"
import { User } from "../models/User"
import { DeviceState } from "../models/DeviceState"

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
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }

    routes(): void {

    }

    listen(): void {
        this.app.listen(this.port, () => console.log("Servidor corriendo en http://localhost:" + this.port))
    }
}
