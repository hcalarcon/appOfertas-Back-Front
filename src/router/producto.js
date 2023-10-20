import { Router } from 'express';
import { 
    getPublish,
    createUsers,
    getUserById
 } from '../controller/producto'

const router = Router();



/**
 * @swagger
 * /publi:
 *  get:
 *      sumary: obtiene algo
 */
router.get('/publi', getPublish);
//get published for id
router.get('/publi/:id');
//get users for id
router.get('/users/:id', getUserById);


router.post('/publi');
/**
 * @swagger
 * /users:
 *  post:
 *      sumary: crea usuarios
 */
router.post('/users', createUsers);

export default router;