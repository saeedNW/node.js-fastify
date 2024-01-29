/** import fastify module */
import Fastify from "fastify";
/** import products response schema */
import { getProductsList, getSingleProduct } from "./schemas.js";

/** create an instants from fastify */
const fastify = Fastify({
	logger: true,
});

/** define application PORT number */
const PORT = 3000;

/**
 * create a simple route with fastify
 */
fastify.get("/", (req, reply) => {
	reply.send({
		message: "Hello from fastify",
	});
});

/**
 * create a route to retrieve a list of products
 */
fastify.get("/products", getProductsList);

/**
 * create a route to retrieve single product
 */
fastify.get("/products/single/:id", getSingleProduct);

const main = async () => {
	try {
		await fastify.listen({ port: PORT });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

main();
