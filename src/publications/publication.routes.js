import { Router  } from "express";
import { check } from "express-validator";

import{
    publicationGet,
    publicationPost
} from "./publication.controller.js"

import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.get("/", publicationGet);

router.post(
    "/",
    [
        check("title", "The Title is required").not().isEmpty(),
        check("category", "The Category is required").not().isEmpty(),
        check("paragraph", "The Paragraph is required").not().isEmpty(),
        validarCampos,
    ], publicationPost);


export default router;
