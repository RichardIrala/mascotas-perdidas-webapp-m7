import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Pet = sequelize.define("Pet", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Sin descripción",
  },
  pictureURL: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:
      "https://res.cloudinary.com/richardiral/image/upload/v1658156548/cld-sample.jpg",
  },
  last_location: { type: DataTypes.STRING, allowNull: false },
  lat: { type: DataTypes.DECIMAL, allowNull: false },
  lng: { type: DataTypes.DECIMAL, allowNull: false },
  founded: { type: DataTypes.BOOLEAN, defaultValue: false },
});
