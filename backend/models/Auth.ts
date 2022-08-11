import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Auth = sequelize.define("Auth", {
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

// export class Auth extends Model {}
// Auth.init(
//   {
//     email: { type: DataTypes.STRING },
//     password: { type: DataTypes.STRING },
//   },
//   { sequelize, modelName: "Auth" }
// );
