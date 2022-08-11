import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, allowNull: false },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//estudiar esta pàrte por mi mismo porque tiene fallos, con el video de marce
// export class User extends Model {}
// User.init(
//   {
//     email: { type: DataTypes.STRING, allowNull: false },
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "User",
//   }
// );
