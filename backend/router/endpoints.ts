import * as express from "express";
import * as path from "path";
import { authMiddleware, getMe } from "../controllers/Auth";
import { createUser, userExist } from "../controllers/User";

export const app = express();

const frontend = path.resolve(__dirname, "../../dist");

app.use(express.json());
app.use(express.static(frontend));

app.post("/users/exist", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userExist(email);
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.post("/usersssss", async (req, res) => {
  try {
    const { email, firstName } = req.body;
    const usuario = await createUser(email, firstName);
    res.json(usuario);
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.post("/users", async (req, res) => {
  const { email, firstName, password } = req.body;
});

app.get("/users", authMiddleware, async (req, res) => {
  const id = req._userId;
  const me = await getMe(id);
  res.json(me);
});
