import { Router } from "express";
import {
  createUsers,
  getUserById,
  logIn,
  tokencheck,
  updateUser,
  profileimg,
  updateUserImage,
} from "../controller/users";

const routerUsers = Router();

//Enpoint para loguear usuario
/**
 * @swagger
 * /user/login:
 *  post:
 *      sumary: loguear usuario
 */
routerUsers.post("/user/login", logIn);

/**
 * @swagger
 * /user/update:
 *  put:
 *      sumary: modificar los datos del usuario
 */
routerUsers.put("/user/update", updateUser);

/**
 * @swagger
 * /user/updateImage:
 *  put:
 *      sumary: modificar la imagen de perfil
 */
routerUsers.put("/user/updateImage", updateUserImage);

//get users for id
routerUsers.get("/users/:id", getUserById);

/**
 * @swagger
 * /token
 * get:
 *  sumary: comprueba el si el token es valido
 */
routerUsers.get("/token", tokencheck);

/**
 * @swagger
 * /usersp:
 *  post:
 *      sumary: crea usuarios
 */
routerUsers.post("/user/usersp", createUsers);

/**
 * @swagger
 * /profile-images:
 * post:
 *  sumary: obtiene las fotos de perfil
 */
routerUsers.get("/profileimg", profileimg);

export default routerUsers;
