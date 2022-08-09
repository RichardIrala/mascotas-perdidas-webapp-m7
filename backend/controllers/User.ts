import { User } from "../models";

export const userExist = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  const exist = user ? true : false;
  return { exist };
};
