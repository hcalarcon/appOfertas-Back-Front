//en este archivo se manejan todos los endpoints de la API
//Esta en contruccion

//Fucnionando hasta el momento

//esta documentado con swagger

//al acceder al endpoint, llama a una funcion que esta en la ruta /controllers/producto.js

import { Router } from "express";
import {
  getPublish,
  getCategoria,
  getPtovta,
  getAll,
} from "../controller/publicacion";

const router = Router();

/**
 * @swagger
 * /publi:
 *  get:
 *      sumary: obtiene todos los usuarios
 */
router.get("/publi", getPublish);

/**
 * @swagger
 * /categoria:
 *  get:
 *      sumary: obtiene todas las categorias cargadas
 */
router.get("/categoria", getCategoria);

/**
 * @swagger
 * /ptovta:
 *  get:
 *      sumary: obtiene todos los puntos de ventas
 */

router.get("/ptovta", getPtovta);

/**
 * @swagger
 * /tipoo:
 *  get:
 *      sumary: obtiene todos los tipos de ofertas
 */

router.post("/all", getAll);

export default router;

//tengo que usar run dev y no start
