/** import products handlers */
import {
	getSingleProductHandler,
	getProductsListHandler,
} from "../handler/products.handler.js";

/** import middlewares example */
import {
	firstExample,
	secondExample,
} from "../middlewares/router.middleware.js";

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
const getSingleProduct = {
	schema: {
		/** define swagger tag */
		tags: ["Products"],
		/** define swagger summary */
		summary: "Retrieve single product data",
		/** define API security method for single API */
		security: [{ apiKey: [] }],
		/** define API params */
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
					description: "single product's id",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			200: productData,
			/** Response for HTTP status code 404 (Notfound) */
			404: notfound,
		},
	},
	/** define the handler related to the single product schema */
	handler: getSingleProductHandler,
};

/** define an output schema for products list request */
const getProductsList = {
	schema: {
		/** define swagger tag */
		tags: ["Products"],
		/** define API security method for single API */
		security: [{ apiKey: [] }],
		/** define swagger summary */
		summary: "Retrieve products list",
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
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [firstExample, secondExample],
	/** define the handler related to the products list schema */
	handler: getProductsListHandler,
};

export default function productRoutes(fastify, options, done) {
	/** define authorization hook for products router */
	fastify.addHook("onRequest", (req) => req.jwtVerify());
	/**
	 * create a route to retrieve a list of products
	 */
	fastify.get("/", getProductsList);

	/**
	 * create a route to retrieve single product
	 */
	fastify.get("/single/:id", getSingleProduct);

	done();
}
