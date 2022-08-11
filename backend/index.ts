import { sequelize } from "./database";
import { app } from "./routes/endpoints";
(async function () {
  const port = process.env.PORT || 3000;
  try {
    await sequelize.authenticate();
    console.log("Autenticación completada");
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log("escuchando en el puerto 3000");
    });
  } catch (error) {
    throw "Error al autenticar";
  }
})();
