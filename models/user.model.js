/** import sequelize methods */
import { Model, DataTypes } from "sequelize";
/** import sequelize connection config */
import { sequelize } from "../configs/sequelize.config.js";

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
