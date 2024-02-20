/** import sequelize methods */
import { Model, DataTypes } from "sequelize";
/** import sequelize connection config */
import { sequelize } from "../configs/sequelize.config.js";

/** initialize the User model with sequelize */
export const User = sequelize.define("User", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstName: { type: DataTypes.STRING },
	lastName: { type: DataTypes.STRING },
	accessToken: { type: DataTypes.STRING, defaultValue: "" },
	username: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	active: { type: DataTypes.BOOLEAN, defaultValue: false },
	birthday: { type: DataTypes.DATE },
});

/** initialize the User's details model with sequelize */
export const UserDetail = sequelize.define("UserDetail", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	address: { type: DataTypes.STRING },
	latitudes: { type: DataTypes.DOUBLE },
	longitudes: { type: DataTypes.DOUBLE },
	UserId: { type: DataTypes.INTEGER },
});

/** define the connection between user and user details models */
User.hasOne(UserDetail);
UserDetail.belongsTo(User);

// User.sync({ alter: true }).then(() => {
// 	console.log("User Sync completed");
// });

// UserDetail.sync({ alter: true }).then(() => {
// 	console.log("UserDetail Sync completed");
// });
