import { User } from "../models";

//Retorna un booleano luego de chequear si X usuario existe en nuestra base de datos
export const userExist = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  const exist = user ? true : false;
  return { exist };
};
