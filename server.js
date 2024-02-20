/** import fastify module */
import Fastify from "fastify";
/** import router initializer */
import routersInitializer from "./router/router.js";
/** import swagger initializer */
import swaggerInitializer from "./configs/swagger.config.js";
/** import fastify bcrypt module */
import fastifyBcrypt from "fastify-bcrypt";
/** import fastify jwt module */
import fastifyJwt from "@fastify/jwt";
/** import fastify middie module */
import fastifyMiddie from "@fastify/middie";
/** import cors module */
import cors from "cors";
/** import serve static module */
import serveStatic from "serve-static";
/** import path module methods */
import { resolve } from "path";

/** create an instants from fastify */
export const fastify = Fastify({
	logger: true,
});

/** define application PORT number */
const PORT = 3000;

const main = async () => {
	/** initialize middlewares in fastify */
	await fastify.register(fastifyMiddie);

	/** initialize fastify bcrypt */
	fastify.register(fastifyBcrypt, {
		saltWorkFactor: 13,
	});

	/** initialize fastify jwt */
	fastify.register(fastifyJwt, {
		secret: "f74a49f9e8f9482fdcd5a458d7f2a8ec5b6987b15397551cd04974804204baf8",
	});

	/** initialize swagger configs */
	swaggerInitializer(fastify);

	/** initialize cors module */
	fastify.use(cors());

	/** initialize system static files */
	fastify.use("/statics", serveStatic(resolve("./public")));

	/** initialize application urls */
	routersInitializer(fastify);

	/**  */
	await fastify.listen({ port: PORT }, (err) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	});
};

main();
