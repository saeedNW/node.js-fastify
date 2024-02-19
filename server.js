/** import fastify module */
import Fastify from "fastify";
/** import router initializer */
import routersInitializer from "./router/router.js";
/** import swagger initializer */
import swaggerInitializer from "./configs/swagger.config.js";
/** import fastify bcrypt module */
import fastifyBcrypt from "fastify-bcrypt";

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
