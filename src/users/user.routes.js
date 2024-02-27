import { Router } from "express";
import { check } from "express-validator";

import{
    usuariosPost,
    usuariosGet
} from "./user.controller.js";

import{
    existenteEmail,
    existenteUserName,
} from "../helpers/db-validators.js"

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", usuariosGet);

router.post(
    "/",
    [
        check("name", "The name is required").not().isEmpty(),
        check("userName", "The User Name is required").custom(existenteUserName),
        check("email", "The Email is required").isEmail(),
        check("email").custom(existenteEmail),
        check("password", "The password must be longer than 6 characters").isLength({min: 6}),
        validarCampos,
    ], usuariosPost);


export default router;