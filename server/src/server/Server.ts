import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import { env } from "../types/types"
import { PORT } from "../config/config"
// import productRouter from "../routes/products.routes.js"
// import userRouter from "../routes/user.routes.js"
// import saleRouter from "../routes/sale.routes.js"
import { dbConnection } from "../db/db"

export class Server {
    private app: Application;
    public port: env;

    constructor() {
        this.app = express();
        this.port = PORT;

        this.dbConnection()

        // this.middlewares();
        // this.routes();
    }

    async dbConnection(): Promise<void> {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }

    routes(): void {
        // this.app.use("/api", productRouter);
        // this.app.use("/api", userRouter);
        // this.app.use("/api", saleRouter);
    }

    listen(): void {
        this.app.listen(this.port, () => console.log("Servidor corriendo en http://localhost:" + this.port))
    }
}

export default Server