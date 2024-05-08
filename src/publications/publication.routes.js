import { Router  } from "express";
import { check } from "express-validator";

import{
    /*publicationDelete,*/
    publicationGet,
    publicationPost,
   /* publicationPut*/
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
        check("imagenUrl", "The Image is obligatory").not().isEmpty(),
        validarCampos,
    ], publicationPost);

/*router.put(
    "/:id",
    [
       validarJWT,
       check("title", "The title is obligatory").not().isEmpty(),
       check("category", "The category is obligatory").not().isEmpty(),
       check("paragraph", "The principal text is obligatory").not().isEmpty(),
       validarCampos
    ],publicationPut);


router.delete(
    "/:id",
         validarJWT, 
    publicationDelete);*/


export default router;
