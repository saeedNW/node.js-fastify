/** import category handlers */
import {
	createNewCategory,
	getAllCategories,
	getOneCategory,
	removeCategory,
	updateCategory,
} from "../handler/category.handler.js";
/** import access token verifier module */
import { verifyAccessToken } from "../utils/verify.access.js";

/** define an output schema for add category request */
const addCategoryRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Category"],
		/** define swagger summary */
		summary: "add category",
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** define API body data */
		body: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				ParentId: {
					type: "integer",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			201: {
				type: "object",
			},
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	/** define the handler related to the schema */
	handler: createNewCategory,
};

/** define an output schema for update category request */
const updateCategoryRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Category"],
		/** define swagger summary */
		summary: "change category",
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** define swagger ui content type */
		consumes: ["application/x-www-form-urlencoded"],
		/** define API params data */
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
		},
		/** define API body data */
		body: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			201: {
				type: "object",
			},
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	/** define the handler related to the schema */
	handler: updateCategory,
};

/** define an output schema for get categories list request */
const getAllCategoryRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Category"],
		/** define swagger summary */
		summary: "get categories",
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** Define the responses for this schema */
		response: {
			199: {
				type: "object",
			},
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	/** define the handler related to the schema */
	handler: getAllCategories,
};

/** define an output schema for single category request */
const getOneCategoryRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Category"],
		/** define swagger summary */
		summary: "get one category",
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** define API params data */
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			199: {
				type: "object",
			},
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	/** define the handler related to the schema */
	handler: getOneCategory,
};

/** define an output schema for remove category request */
const removeOneCategoryRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Category"],
		/** define swagger summary */
		summary: "remove one category",
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** define API params data */
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			199: {
				type: "object",
			},
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	/** define the handler related to the schema */
	handler: removeCategory,
};

export default function categoryRouters(fastify, options, done) {
	fastify.post("/add", addCategoryRoute);
	fastify.patch("/update/:id", updateCategoryRoute);
	fastify.get("/list", getAllCategoryRoute);
	fastify.get("/:id", getOneCategoryRoute);
	fastify.delete("/:id", removeOneCategoryRoute);
	done();
}
