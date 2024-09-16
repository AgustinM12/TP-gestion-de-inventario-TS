import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

//! CREACION DE USUARIO

export const validateCreateOrg = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de la organizacion")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("location")
        .exists().withMessage("Debe escoger una locacion")
        .isAlphanumeric().withMessage("La locacion solo debe contener caracteres alfanumericos"),

    check("manager")
        .exists().withMessage("Debe escoger el manager de la organizacion")
        .isAlphanumeric().withMessage("El id no es valido"),

    check("delegate")
        .exists().withMessage("Debe escoger el delegado a cargo")
        .isAlphanumeric().withMessage("El id no es valido"),


    validateSchema(["name", "location", "manager", "delegate"])
]

