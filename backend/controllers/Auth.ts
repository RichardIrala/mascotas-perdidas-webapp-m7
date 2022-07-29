import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Auth, User } from "../models";
import "dotenv/config";
//crypto function para hashear la password que vamos a ingresar en Auth
function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/* Utilizo estos controllers modificados que utilice en algun momento. Falta quitarle dependencias que no le corresponden y transformarlo en una función independiente de un EndPoint para que sea más escalable a futuro */

const SECRET = process.env.JWT_SECRET;

export const auth = async (
  email: string,
  firstName: string,
  password: string
) => {
  const passwordEncriptada = hashPassword(password);

  try {
    const [usuario, creado] = await User.findOrCreate({
      where: { email },
      defaults: { email, firstName },
    });

    const userId = usuario.get("id");
    const [auth, authCreated] = await Auth.findOrCreate({
      where: { user_id: userId },
      defaults: {
        email,
        password: passwordEncriptada,
        user_id: userId,
      },
    });

    return auth;
  } catch (error) {
    return { message: error.message };
  }
};

export const token = async (req, res) => {
  const { password, email } = req.body;
  try {
    const passwordHasheada = hashPassword(password);
    const auth = await Auth.findOne({
      where: { email: email, password: passwordHasheada },
    });

    if (auth) {
      const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
      res.json({ token });
    } else res.status(400).json({ message: "Email o contraseña incorrecta" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getMe = async (id: number) => {
  const myUserInfo = await User.findByPk(id);
  return myUserInfo;
};

//MIDDLEWARE QUE CHEQUEA EL JWT
export const authMiddleware = async (req, res, next) => {
  const headerAuthorization = req.get("Authorization");
  const infoSpliteada = headerAuthorization.split(" ");
  try {
    const myInfoVerified = jwt.verify(infoSpliteada[1], SECRET);
    const id = myInfoVerified.id;
    req._userId = id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
