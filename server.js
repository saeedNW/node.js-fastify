/** import fastify module */
import Fastify from "fastify";
/** import products list */
import { products } from "./products.js";

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
fastify.get("/products", (req, reply) => {
	reply.send(products);
});

/**
 * create a route to retrieve single product
 */
fastify.get("/products/single/:id", (req, reply) => {
	/** extract id from request */
	const { id } = req.params;
	/** find the requested product from product list */
	const product = products.find((p) => p.id === +id);
	/** send error if the product was not found */
	if (!product) {
		return reply.code(404).send({ message: "Product was notfound" });
	}
	/** send success response */
	return reply.send(product);
});

const main = async () => {
	try {
		await fastify.listen({ port: PORT });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

main();
