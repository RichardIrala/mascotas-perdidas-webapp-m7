import { sequelize } from "../database";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Sincronización completada");
  } catch (error) {
    console.error(error.message);
  }
})();
