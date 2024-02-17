/** import sequelize methods */
const { Model, DataTypes } = require("sequelize");
/** import sequelize connection config */
import { sequelize } from "../configs/sequelize.config";

/**
 * represents a User in the database.
 * @class
 * @extends Model
 */
export class User extends Model {}

/** initialize the User model with sequelize */
User.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		firstName: { type: DataTypes.STRING },
		lastName: { type: DataTypes.STRING },
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		active: { type: DataTypes.BOOLEAN, defaultValue: false },
		birthday: { type: DataTypes.DATE },
	},
	/** Configuration options */
	{ sequelize, name: "users" }
);

/** synchronize the model with the database, creating the "users" table if it doesn't exist */
User.sync({ force: true });
