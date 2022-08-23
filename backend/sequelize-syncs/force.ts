import { sequelize } from "../database";
import { Pet, Auth, User } from "../models/index";

(async () => {
  try {
    await Auth.sync({ force: true });
    await Pet.sync({ force: true });
    await User.sync({ force: true });
    console.log("Sincronización completada /force");
  } catch (error) {
    console.error(error.message);
  }
})();
