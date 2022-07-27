import { Dialect, Sequelize } from "sequelize";
import "dotenv/config";
export const sequelize = new Sequelize({
  dialect: process.env.SEQUELIZE_DIALECT as Dialect,
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  port: 5432,
  host: process.env.SEQUELIZE_HOST,
  //ssl true significa (conectar de manera segura)
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
