/** import sequelize module */
import { Sequelize } from "sequelize";

/** create new instance from sequelize and initialize postgres connection */
export const sequelize = new Sequelize("fastify", "postgres", "root", {
	host: "localhost",
	port: 5432,
	dialect: "postgres",
});

/*export const sequelize = new Sequelize(
	"postgres://postgres:root@localhost:5432/fastify"
);

const DBConnection = async () => {
	await sequelize.authenticate();
	console.log("connected");
};

DBConnection();*/
