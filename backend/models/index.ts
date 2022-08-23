import { Auth } from "./Auth";
import { Pet } from "./Pet";
import { User } from "./User";

User.hasOne(Auth);
Auth.belongsTo(User);

User.hasMany(Pet);
Pet.belongsTo(User);

export { User, Auth, Pet };
