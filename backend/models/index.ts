import { Auth } from "./Auth";
import { Pet } from "./Pet";
import { Report } from "./Report";
import { User } from "./User";

User.hasOne(Auth);
Auth.belongsTo(User);

Pet.hasOne(Report);
Report.belongsTo(Pet);

User.hasMany(Report);
Report.belongsTo(User);

export { User, Auth, Report, Pet };
