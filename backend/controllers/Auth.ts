import * as crypto from "crypto";
//crypto function para hashear la password que vamos a ingresar en Auth
function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

//Falta añadir jsonwebtoken para encriptar la password y crear un token y etc etc etc

/* El primer crea el token, y el segundo verifica el token. Faltaria instalar el jwt para preparar  el auth token y tmb un middleware para corroborar que el token sea el mismo y avanzar para que sea más seguro*/
//const token = jwt.sign({ id: auth.get("UserId") }, SECRET);
// const myInfoVerified = jwt.verify(infoSpliteada[1], SECRET);
