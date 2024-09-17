import { User, IUser } from "../models/User";
import { usersDB } from "../types/types"

export class UserService {

    public async findAll(): Promise<usersDB> {
        try {
            const users: usersDB = await User.find()

            if (users.length > 0) {
                return users
            } else {
                throw new Error("No existen usuarios");

            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuarios: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findById(idUser: string): Promise<IUser> {
        try {
            const users: IUser | null = await User.findById(idUser)

            if (users !== null) {
                return users
            } else {
                throw new Error("No existe el usuario");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuarios: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findByRole(idRole: string): Promise<IUser[]> {
        try {
            console.log(idRole);

            // ! AGREGAR EL ID REAL DEL ROL
            const usersByRole: IUser[] = await User.find({ role: idRole }).select('_id role name');

            if (usersByRole.length > 0) {
                return usersByRole
            } else {
                throw new Error("No existen usuarios");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar usuarios: ${error.message}`);
            } else {
                throw new Error("Error desconocido");
            }
        }
    }

    public async findByNameEmail(userData: string): Promise<boolean | IUser> {
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

            if (deletedUser !== null) {
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

    public async update(idUser: string, userData: IUser): Promise<boolean> {
        try {
            const updatedUser: IUser | null = await User.findByIdAndUpdate(idUser, userData);

            if (updatedUser !== null) {
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

}
