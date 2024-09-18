import { IUser } from "../models/User";
import { UserService } from "./User.services";
import { verifyPassword } from "../helpers/bcrypt";
import { JsonWebToken } from "../helpers/jwt";

export class AuthServices {

    public async login(userData: { user: string, password: string }): Promise<{ token: string, role: number, name: string, id: any } | false> {
        try {
            const user: IUser | boolean = await new UserService().findByNameEmail(userData.user);

            if (typeof user !== "boolean") {
                const validPassword: boolean = await verifyPassword(userData.password, user?.password)

                if (validPassword) {
                    const token = new JsonWebToken().generateToken(user)
                    return { token, role: user.role, name: user.name, id: user._id }
                } else {
                    throw new Error("La contraseña no es valida");
                }
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al logearse : ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }


}