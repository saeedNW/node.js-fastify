/** import products list */
import { products } from "../db/products.js";

/**
 * Fastify single product retriever handler
 * @param {object} req - Fastify request object
 * @param {object} reply - Fastify replay object
 * @returns {*} - Send response to the client
 */
function getSingleProductHandler(req, reply) {
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
}

/**
 * Fastify products list retriever handler
 * @param {object} req - Fastify request object
 * @param {object} reply - Fastify replay object
 */
function getProductsListHandler(req, reply) {
	reply.send(products);
}

export { getSingleProductHandler, getProductsListHandler };
