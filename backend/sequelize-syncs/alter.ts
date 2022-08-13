import { sequelize } from "../database";
import { Pet, Auth, Report, User } from "../models/index";

(async () => {
  try {
    await Auth.sync({ alter: true });
    await Pet.sync({ alter: true });
    await Report.sync({ alter: true });
    await User.sync({ alter: true });
    console.log("Sincronización completada /alter");
  } catch (error) {
    console.error(error.message);
  }
})();
