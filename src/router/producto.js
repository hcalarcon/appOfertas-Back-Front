import { Router } from 'express';
import { 
    getPublish,
    createUsers,
    getUserById,
    logIn
 } from '../controller/producto'

const router = Router();
/**
 * @swagger
 * /publi:
 *  get:
 *      sumary: obtiene todos los usuarios
 */
router.get('/publi', getPublish);

//get users for id
router.get('/users/:id', getUserById);


//Enpoint para loguear usuario
/**
 * @swagger
 * /logim:
 *  post:
 *      sumary: loguear usuario
 */
router.post('/login', logIn);



/**
 * @swagger
 * /usersp:
 *  post:
 *      sumary: crea usuarios
 */
router.post('/usersp', createUsers);



export default router;

//tengo que usar run dev y no start 