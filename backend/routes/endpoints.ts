import * as express from "express";
import * as path from "path";
import { auth, getMe, token } from "../controllers/Auth";
import { userExist } from "../controllers/User";
import { authMiddleware } from "../middlewares/authMiddleware";

export const app = express();

const frontend = path.resolve(__dirname, "../../dist");

app.use(express.json());
app.use(express.static(frontend));

//Existe el usuario?
app.post("/users/exist", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userExist(email);
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Crear un usuario o recuperarlo (cambiarlo a 2 endpoints)
app.post("/auth", async (req, res) => {
  try {
    const { email, firstName, password } = req.body;
    const authData = await auth(email, firstName, password);
    res.json(authData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//recibir el token de mi usuario === LOGUEARSE
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  try {
    const authToken = await token(password, email);
    res.json(authToken);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//solicitar mi información de usuario
app.get("/users/me", authMiddleware, async (req, res) => {
  const id = req._userId;
  try {
    const me = await getMe(id);
    res.json(me);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//todo lo que no coincida con una ruta, devuelve el index.html
app.get("*", (req, res) => {
  res.sendFile(frontend + "/index.html");
});
