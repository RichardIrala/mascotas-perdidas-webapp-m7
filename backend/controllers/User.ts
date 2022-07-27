import { User } from "../models";

export const createUser = async (email: string, firstName: string) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { firstName },
  });
  return user;
};

export const userExist = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  const exist = user != null;
  return { exist };
};
