//aquí se manejan las peticiones que realiza en front
//esta en construcción

//en funcionamiento
//login y singup

import { connect } from "../databases";

//verifica si existe el usuario en la BD y luego comprueba si la contraseña es correcta
export const logIn = async (req, res) => {
  const cnn = await connect();
  const { email, password } = req.body;
  const [row] = await cnn.query("SELECT password FROM users WHERE email = ? ", [
    email,
  ]);

  if (row.length > 0) {
    if (password === row[0].password) {
      res.json({ success: true }); //usuario y contraseña correcta
    } else {
      res.status(401).json({ success: false }); //la contraseña es incorrecta
    }
  } else {
    res.status(401).json({ success: false }); //el usuario no existe
  }
  //faltaria crear un token para validar la session en el front, cada ves que se inicie la app
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
    return res
    // return res.status(400); //el suario ya existe
  }

  const [result] = await cnn.query(
    "INSERT INTO users (username, email, password) VALUE (?,?,?)",
    [username, email, password]
  );
  if (result.affectedRows === 1) {
    return res.json({ success: true, message: "El usuario se ha creado con exito" }); //se crear el usuario en la base de datos
  } else {
    return res.status(500).json({ success: false }); //no se pudo crear el usuario en la base de datos
  }
};

export const getPublish = async (req, res) => {
  const cnn = await connect();
  const [row] = await cnn.query("select * from users");
  res.json(row);
};

//funcion para obetener los datos de un usuario desde la base de datos a traves del id
export const getUserById = async (req, res) => {
  const cnn = await connect();
  const [row] = await cnn.query("select * from users WHERE userId = ?", [
    req.params.id,
  ]);
  res.json(row[0]);
};
