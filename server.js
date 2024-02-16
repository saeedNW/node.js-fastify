/** import fastify module */
import Fastify from "fastify";
/** import router initializer */
import routersInitializer from "./router/router.js";
/** import fastify swagger module */
import fastifySwagger from "@fastify/swagger";
/** import fastify swagger ui module */
import fastifySwaggerUi from "@fastify/swagger-ui";

/** create an instants from fastify */
const fastify = Fastify({
	logger: true,
});

/** define application PORT number */
const PORT = 3000;

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
	prefix: "api-doc",
	swagger: {
		info: {
			title: "Fastify Swagger",
		},
	},
});

/** initialize application urls */
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
