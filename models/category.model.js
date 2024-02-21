import { DataTypes } from "sequelize";
import { sequelize } from "../configs/sequelize.config.js";

export const Category = sequelize.define("Category", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
	},
	ParentId: {
		type: DataTypes.INTEGER,
	},
});

Category.hasMany(Category, { as: "children", foreignKey: "ParentId" });
Category.belongsTo(Category, { as: "Children", foreignKey: "ParentId" });
// Category.sync({alter: true}).then(() => {
//     console.log("Category sync completed");
// })
