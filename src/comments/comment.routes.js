import { Router } from "express";
import { check } from "express-validator";

import {
    commentPost,
    commentGet,
    commentPut,
    commentDelete
} from "./comment.controller.js";

import { validarJWT } from "../middlewares/validate-jwt.js"
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("content", "The content is obligatory").not().isEmpty(), 
        check("idPublicacion", "The publication ID is obligatory").not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    commentPost
);

router.get("/", commentGet);

router.put(
    "/:id",
    [
        validarJWT,
        check("content", "The content is obligatory").not().isEmpty(),
        validarCampos
    ],
    commentPut
);

router.delete(
    "/:id",
    validarJWT, 
    commentDelete
);

export default router;