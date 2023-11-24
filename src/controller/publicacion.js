//aquí se manejan las peticiones que realiza en front
//esta en construcción

//en funcionamiento
//login y singup

import { connect } from "../databases";


export const getPublish = async (req, res) => {
  const cnn = await connect();
  const [row] = await cnn.query("select * from users");
  res.json(row);
};


