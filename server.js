/** import fastify module */
import Fastify from "fastify";
/** import router initializer */
import routersInitializer from "./router/router.js";

/** create an instants from fastify */
const fastify = Fastify({
	logger: true,
});

/** define application PORT number */
const PORT = 3000;

routersInitializer(fastify);

const main = async () => {
	try {
		await fastify.listen({ port: PORT });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

main();
