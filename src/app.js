import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
const spec = swaggerJSDoc(options);

import rutas from "./router/publicacion";
import rutasu from "./router/users";

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profileimg/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utiliza el nombre original del archivo
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Rutas principales
app.use(rutas);
app.use(rutasu);

//documentacion
app.use("/docs", swaggerUI.serve, swaggerUI.setup(spec));

//manejo de imagenes
app.post("/profileimg", upload.single("photo"), (req, res) => {
  res.send("Imagen cargada correctamente");
});

export default app;
