import { connect } from "../databases";
import jwt from "jsonwebtoken";
const clave = "appboom";


//Funcion para verificar si el tocken es valido
export const tokencheck = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
  
    jwt.verify(token, clave, (err, usuario) => {
      if (err) {
        return res.status(401).json({ mensaje: "Token no válido" });
      }
      req.usuario = usuario;
      next();
    });
  };
  
  //verifica si existe el usuario en la BD y luego comprueba si la contraseña es correcta
  export const logIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const cnn = await connect();
      const [row] = await cnn.query("SELECT * FROM users WHERE email =  ? ", [
        email,
      ]);
  
      if (row.length > 0) {
        if (password === row[0].password) {
          const {
            username,
            userId,
            nombre,
            apellido,
            email: emailbd,
            dni,
          } = row[0];
          const token = jwt.sign({ email }, clave, { expiresIn: "5m" }); //token de session
          res.json({
            success: true,
            token,
            username,
            userId,
            nombre,
            apellido,
            emailbd,
            dni,
          }); //usuario y contraseña correcta
        } else {
          res
            .status(401)
            .json({ success: false, mesage: "contraseña incorrecta" }); //la contraseña es incorrecta
        }
      } else {
        res.status(401).json({ success: false, message: "el usuario no existe" }); //el usuario no existe
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      res
        .status(500)
        .json({ success: false, message: "Error en la autenticación" });
    }
  };
  
  //funcuion para saber si existe un usuario por parametro
  export const userExist = async (valorBuscardo, atributoaBuscar) => {
    const cnn = await connect();
    const query = `select * from users WHERE ${atributoaBuscar} = ?`;
    const [row] = await cnn.query(query, [valorBuscardo]);
    console.log(row[0]);
    return row[0];
  };
  
  //crear usuarios desde el sigup
  export const createUsers = async (req, res) => {
    const cnn = await connect();
    //desestruturo el cuerpo de la request
    const { username, email, password } = req.body;
  
    const existForEmail = await userExist(email, "email"); //comprueba si existe el email
    const existForserName = await userExist(username, "username"); //comprueba si existe el username
  
    if (existForEmail || existForserName) {
      console.log(res.status(400));
      return res;
      // return res.status(400); //el suario ya existe
    }
  
    const [result] = await cnn.query(
      "INSERT INTO users (username, email, password) VALUE (?,?,?)",
      [username, email, password]
    );
    if (result.affectedRows === 1) {
      return res.json({
        success: true,
        message: "El usuario se ha creado con exito",
      }); //se crear el usuario en la base de datos
    } else {
      return res.status(500).json({ success: false }); //no se pudo crear el usuario en la base de datos
    }
  };

  export const updateUser = async (req, res) => {
    const cnn = await connect();
    const { username, email, nombre, apellido, dni, userId } = req.body;
  
    const row = await cnn.query(
      "UPDATE users SET username = ?, email = ?, nombre = ?, apellido = ?, dni = ? where userId = ?",
      [username, email, nombre, apellido, dni, userId]
    );
    res.sendStatus(204);
  };
  
  //funcion para obetener los datos de un usuario desde la base de datos a traves del id
  export const getUserById = async (req, res) => {
    const cnn = await connect();
    const [row] = await cnn.query("select * from users WHERE userId = ?", [
      req.params.id,
    ]);
    res.json(row[0]);
  };