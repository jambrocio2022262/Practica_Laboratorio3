import { Router  } from "express";
import { check } from "express-validator";

import{
    publicationDelete,
    publicationGet,
    publicationPost,
    publicationPut
} from "./publication.controller.js"

import{
    existePublicationById
} from "../helpers/db-validators.js"

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

router.put(
    "/:id",
    [
        check("id", "Incorrect Id").isMongoId(),
        check("id").custom(existePublicationById),
        validarCampos
    ],publicationPut);

router.delete(
    "/:id",
    [
        check("id", "Incorrect Id").isMongoId(),
        check("id").custom(existePublicationById),
        validarCampos
    ], publicationDelete);


export default router;
