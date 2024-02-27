import { Router } from "express";
import { check } from "express-validator";

import{
    usuariosPost,
    usuariosGet,
    usuariosPut
} from "./user.controller.js";

import{
    existenteEmail,
    existenteUserName,
    existeUsuarioById
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


    router.put(
        "/:id",
        [
          check("id", "No es un ID válido").isMongoId(),
          check("id").custom(existeUsuarioById),
          validarCampos,
        ],usuariosPut);


export default router;