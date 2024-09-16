import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

//! CREACION DE USUARIO

export const validateCreateDevice = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("tradeMark")
        .exists().withMessage("Debe escoger una marca")
        .isAlphanumeric().withMessage("La marca solo debe contener caracteres alfanumericos"),

    check("organization")
        .exists().withMessage("Debe escoger a la organizacion dueña del dispositivo")
        .isAlphanumeric().withMessage("El id no es valido"),

    check("type")
        .exists().withMessage("Debe agregar el tipo del dispositivo")
        .custom((value) => {
            const number = parseInt(value, 10);
            if (isNaN(number) || number < 0 || number > 4) {
                throw new Error('El valor debe ser entre 0 y 4');
            }
            return true;
        }),

    check("defectiveDetails")
        .isArray().withMessage('El valor debe ser un array')
        .custom((items) => {
            if (!Array.isArray(items)) {
                throw new Error('Debe ser un array');
            }

            items.forEach(item => {
                if (!/^[a-zA-Z0-9]+$/.test(item)) {
                    throw new Error('Todos los elementos deben ser alfanuméricos');
                }
            });

            return true;
        }),

    validateSchema(["name", "tradeMark", "organization", "type", "defectiveDetails"])
]

