//en este archivo se manejan todos los endpoints de la API
//Esta en contruccion

//Fucnionando hasta el momento
//login y singup

//esta documentado con swagger

//al acceder al endpoint, llama a una funcion que esta en la ruta /controllers/producto.js

import { Router } from "express";
import {
  getPublish,
  
} from "../controller/publicacion";

const router = Router();



/**
 * @swagger
 * /publi:
 *  get:
 *      sumary: obtiene todos los usuarios
 */
router.get("/publi", getPublish);









export default router;

//tengo que usar run dev y no start
