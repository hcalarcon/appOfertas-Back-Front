import { connect } from '../databases'


//verifica si existe el usuario en la BD y luego comprueba si la contraseña es correcta
export const logIn = async (req, res) => {
    const cnn = await connect();
    const { email, password } = req.body;
    const [row] = await cnn.query('SELECT password FROM users WHERE email = ? ', [email]);

    if (row.length > 0) {
        if (password === row[0].password) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } else {
        res.status(401).json({ success: false });
    }

}

//funcuion para saber si existe un usuario por parametro
export const userExist = async ( valorBuscardo, atributoaBuscar) => {
    const cnn = await connect()
    const query = `select * from users WHERE ${atributoaBuscar} = ?`
    const [row] = await cnn.query(query, [valorBuscardo]);
    return row[0];
}

//crear usuarios desde el sigup 
export const createUsers = async (req, res) => {
    const cnn = await connect()
    //desestruturo el cuerpo de la request
    const { username, email, password } = req.body;

    const existForEmail = await userExist(email,'email') //comprueba si existe el email
    const existForserName = await userExist(username,'username') //comprueba si existe el username

    if ( existForEmail || existForserName) {
        console.log('El usuario ya existe en')
        return res.status(400);
    }

    const result = await cnn.query('INSERT INTO users (username, email, password) VALUE (?,?,?)', [
        username,
        email,
        password
    ]);
    if (result.affectedRows === 1) {
        return res.status(201);
    } else {
        return res.status(500);
    }
}

export const getPublish = async (req, res) => {
    const cnn = await connect();
    const [row] = await cnn.query('select * from users');
    res.json(row);
}

//funcion para obetener los datos de un usuario desde la base de datos a traves del id
export const getUserById = async (req, res) => {
    const cnn = await connect()
    const [row] = await cnn.query('select * from users WHERE userId = ?', [req.params.id]);
    res.json(row[0]);
}
