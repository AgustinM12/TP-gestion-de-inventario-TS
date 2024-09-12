import { User, IUser } from "../models/User";
import { usersDB } from "../types/types"
import { verifyPassword } from "../helpers/bcrypt"
import { JsonWebToken } from "../helpers/jwt"

export class UserService {

    public async find(): Promise<boolean | IUser[]> {
        try {
            const users: IUser[] = await User.find()

            if (users.length > 0) {
                return users
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuarios: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findById(idUser: string): Promise<boolean | IUser> {
        try {
            const users: IUser | null = await User.findById(idUser)

            if (users !== null) {
                return users
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuarios: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findByRole(idRole: number): Promise<boolean | IUser[]> {
        try {
            // ! AGREGAR EL ID REAL DEL ROL
            const usersByRole: IUser[] = await User.find({ role: idRole })

            if (usersByRole.length > 0) {
                return usersByRole
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuarios: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findByNameEmail(userData: { user: string }): Promise<boolean | IUser> {
        try {
            // ! AGREGAR EL ID REAL DEL ROL
            const userAccount: IUser | null = await User.findOne({
                $or: [
                    { name: userData },
                    { email: userData }
                ]
            });

            if (userAccount !== null) {
                return userAccount
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuario: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async create(userData: IUser): Promise<boolean> {
        try {
            const user: IUser = await User.create(userData);

            if (user) {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear el usuario: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async delete(userId: string): Promise<boolean> {
        try {

            const deletedUser: usersDB = await User.findByIdAndDelete(userId);

            if (deletedUser) {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al elimnar el usuario: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async update(userData: IUser): Promise<boolean> {
        try {
            const updatedUser: usersDB = await User.findByIdAndUpdate(userData);

            if (updatedUser) {
                return true
            } else {
                return false
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al actualizar el usuario: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async login(userData: { user: string, password: string }): Promise<string | false> {
        try {
            const user: IUser | boolean = await this.findByNameEmail(userData);

            if (typeof user !== "boolean") {
                const validPassword: boolean = await verifyPassword(userData.password, user?.password)

                if (validPassword) {
                    return new JsonWebToken().generateToken(user)
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
