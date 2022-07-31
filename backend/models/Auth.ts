import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
export class Auth extends Model {}
Auth.init(
  {
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Auth" }
);
