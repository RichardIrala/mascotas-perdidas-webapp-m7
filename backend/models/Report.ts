import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Report = sequelize.define("Report", {
  description: { type: DataTypes.STRING, allowNull: false },
});
