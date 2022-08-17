import "dotenv/config";
import * as jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;
//MIDDLEWARE QUE CHEQUEA EL JWT
export const authMiddleware = async (req, res, next) => {
  try {
    const headerAuthorization = req.get("Authorization");
    const infoSpliteada = headerAuthorization.split(" ");
    const myInfoVerified = jwt.verify(infoSpliteada[1], SECRET);
    const id = myInfoVerified.id;
    req._userId = id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
