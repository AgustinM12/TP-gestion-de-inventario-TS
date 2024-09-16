import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator";

//! CREACION DE USUARIO

export const validateCreateUser = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail(),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword().withMessage("La contraseña debe contener al menos una mayuscula, minuscula, numero, caracter especial y al menos 8 caracteres"),

    check("role")
        .exists().withMessage("Debe escoger un rol")
        .custom((value) => {
            const number = parseInt(value, 10);
            if (isNaN(number) || number < 1 || number > 4) {
                throw new Error('El valor debe ser un número entre 1 y 4');
            }
            return true;
        }),

    check("dni")
        .exists().withMessage("Debe escoger un dni")
        .custom((value) => {
            try {
                const number = value.toString(); // Convertimos el valor a string
                if (!/^\d{8}$/.test(number)) { // Verifica si es un número de exactamente 8 dígitos
                    throw new Error('El valor debe ser un número de 8 dígitos');
                }
                return true;
            } catch (error) {
                return true;
            }
        }),
    validateSchema(["name", "email", "password", "role", "dni"])
]

//! LOGIN

export const validateLogin = [
    check("user")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("password")
        .exists().withMessage("Debe escoger una contraseña"),

    validateSchema(["user", "password"])
]
