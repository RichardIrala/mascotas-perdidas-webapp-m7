import { sequelize } from "../database";

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Sincronización completada");
  } catch (error) {
    console.error(error.message);
  }
})();
