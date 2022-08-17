import * as express from "express";
import * as path from "path";
import { auth, getMe, token } from "../controllers/Auth";
import {
  getPets,
  getPetsCercaDe,
  newPet,
  petsReportedBy,
} from "../controllers/pet-controller";
import { userExist } from "../controllers/User";
import { sequelize } from "../database";
import { authMiddleware } from "../middlewares/authMiddleware";

export const app = express();

const frontend = path.resolve(__dirname, "../../dist");

app.use(express.json({ limit: "20mb" }));
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

app.get("/sync-force", async (req, res) => {
  await sequelize.sync({ force: true });
  res.json({ message: "sync completo" });
});

//Crear un usuario
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

//EDNPOINTS DE MASCOTAS
app.post("/pets", authMiddleware, async (req, res) => {
  const UserId = req._userId;
  const { name, last_location, lat, lng, description, pictureURL } = req.body;
  if (lat > 90 || lat < -90 || lng > 90 || lat < -90) {
    res.json({
      message:
        "Los valores para la latitud y la longitud solo pueden ser desde -90 hasta 90.",
    });
    return;
  }
  try {
    //Devuelve la nueva mascota
    let pet = await newPet(
      UserId,
      name,
      pictureURL,
      last_location,
      lat,
      lng,
      description
    );
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/pets", async (req, res) => {
  const pets = await getPets();
  res.json(pets);
});

app.get("/pets/cerca-de", async (req, res) => {
  const { lat, lng } = req.query;
  const pets = await getPetsCercaDe(lat, lng);
  console.log(pets);
  res.json(pets);
});

app.get("/pets/reported-by-user", authMiddleware, async (req, res) => {
  const UserId = req._userId;
  try {
    const pets = await petsReportedBy(UserId);
    res.json(pets);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//todo lo que no coincida con una ruta, devuelve el index.html
app.get("*", (req, res) => {
  res.sendFile(frontend + "/index.html");
});
