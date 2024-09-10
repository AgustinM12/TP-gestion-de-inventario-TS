import bcrypt from 'bcrypt'

class BcryptPassword {

    public async encryptPassword(plainPassword: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(plainPassword, salt);
            return hash;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error encriptando la contraseña: ${error.message}`);
            } else {
                throw new Error('Error desconocido al encriptar la contraseña');
            }
        }
    }

    public async verifyPassword(Password: string, PasswordHash: string): Promise<boolean> {
        try {

            const match: boolean = await bcrypt.compare(Password, PasswordHash);

            if (match === true) {
                return match;
            } else {
                throw new Error("Las contraseñas no coinciden");
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Error desconocido al verificar la contraseña');
            }
        }
    }
}

export const { encryptPassword, verifyPassword } = new BcryptPassword()