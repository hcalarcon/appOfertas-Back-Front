import { connect } from '../databases'

export const getPublish = async (req, res) => {
    const cnn = await connect();
    const [row] = await cnn.query('select * from users');
    res.json(row);
}

export const getUserById = async (req, res) => {
    const cnn = await connect()
    const [row] = await cnn.query('select * from users WHERE userId = ?', [req.params.id]);
    res.json(row[0]);
    
}

export const createUsers = async (req, res) => {
    const cnn = await connect()
    const resul = await cnn.query('INSERT INTO users (username, email, password) VALUE (?,?,?)', [
        req.body.username,
        req.body.email,
        req.body.password
    ]);
}