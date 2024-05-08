import { Router } from "express";
import { check } from "express-validator";

import {
    commentPost,
    commentGet,
    /*commentPut,
    commentDelete*/
} from "./comment.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "The content is obligatory").not().isEmpty(), 
        check("email", "The content is obligatory").not().isEmpty(), 
        check("content", "The content is obligatory").not().isEmpty(), 
        check("idPublicacion", "The publication ID is obligatory").not().isEmpty(),
        validarCampos
    ],
    commentPost
);

router.get("/", commentGet);

/*router.put(
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
);*/

export default router;