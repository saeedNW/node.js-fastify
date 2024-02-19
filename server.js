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

/** create an instants from fastify */
export const fastify = Fastify({
	logger: true,
});

/** define application PORT number */
const PORT = 3000;

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

/** initialize application urls */
routersInitializer(fastify);

const main = async () => {
	try {
		await fastify.listen({ port: PORT });
		console.log(`server running on http://localhost:${PORT}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

main();
