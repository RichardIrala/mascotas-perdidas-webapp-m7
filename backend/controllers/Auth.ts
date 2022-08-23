import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Auth, User } from "../models/index";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET;

//crypto function para hashear la password que vamos a ingresar en Auth
function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

//Crear usuarios y su autenticación evitando replicas.
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
      where: { UserId: userId },
      defaults: {
        email,
        password: passwordEncriptada,
      },
    });

    return auth;
  } catch (error) {
    return { message: error.message };
  }
};

//Esto me devuelve mi token (id encryptado con revision de autenticidad)
export const token = async (password: string, email: string) => {
  try {
    const passwordHasheada = hashPassword(password);
    const auth = await Auth.findOne({
      where: { email: email, password: passwordHasheada },
    });

    if (auth) {
      const token = jwt.sign({ id: auth.get("UserId") }, SECRET);
      return { token };
    } else return { message: "Email o contraseña incorrecta" };
  } catch (error) {
    return { message: error.message };
  }
};

//Devuelve la información del usuario
export const getMe = async (id: number) => {
  const myUserInfo = await User.findByPk(id);
  return myUserInfo;
};

export const changePassword = async (
  id: number,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const passwordHashed = hashPassword(newPassword);
    const oldPasswordHashed = hashPassword(oldPassword);

    const updatedUser = await Auth.update(
      { password: passwordHashed },
      {
        where: {
          id,
          password: oldPasswordHashed,
        },
      }
    );
    if (updatedUser[0] == 0) {
      return { message: "Contraseña erronea" };
    } else return { message: "Cambio de contraseña exitoso" };
  } catch (error) {
    return { error: error.message };
  }
};
