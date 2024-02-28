import { Router } from "express";
import { check } from "express-validator";

import {validarCampos} from "../middlewares/validar-campos.js"
import { login } from "./auth.controller.js";

const router = Router();

router.post(
    '/login',
    [
        check('usuario', "Email or user name is required").not().isEmpty(),
        check('password', "Password is required").not().isEmpty(),
        validarCampos,
    ], login);

export default router;