import { Auth } from "./Auth";
import { User } from "./User";

User.hasOne(Auth);
Auth.belongsTo(User);
export { User, Auth };
