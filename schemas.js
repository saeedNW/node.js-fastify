/** import products list */
import { products } from "./products.js";

/** define product data structure */
const productData = {
	/** Define the type of data as an object */
	type: "object",
	/** Specify the properties of the object */
	properties: {
		/** Property 'id' of type integer */
		id: { type: "integer" },
		/** Property 'name' of type string */
		name: { type: "string" },
	},
};

const notfound = {
	/** Define the type of response as an object */
	type: "object",
	/** Specify the properties of the object */
	properties: {
		/** Property 'message' of type string */
		message: { type: "string" },
	},
};

/** define an output schema for single products request */
export const getSingleProduct = {
	schema: {
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			200: productData,
			/** Response for HTTP status code 404 (Notfound) */
			404: notfound,
		},
	},
	/** define the handler related to the single product schema */
	handler: function (req, reply) {
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
	},
};

/** define an output schema for products list request */
export const getProductsList = {
	schema: {
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			200: {
				/** Define the type of response as an array */
				type: "array",
				/** Specify the schema for each item in the array */
				items: productData,
			},
		},
	},
	/** define the handler related to the products list schema */
	handler: function (req, reply) {
		reply.send(products);
	},
};
