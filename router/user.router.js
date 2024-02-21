/** import user process handlers */
import {
	updateProfileHandler,
	getProfileHandler,
} from "../handler/user.handler.js";
/** import user access token verifier */
import { verifyAccessToken } from "../utils/verify.access.js";

/** define update process response structure */
const updateProcessResponse = {
	type: "object",
	properties: {
		success: { type: "boolean" },
		status: { type: "integer" },
		message: { type: "string" },
	},
};

/** define get user response structure */
const getUserProcessResponse = {
	type: "object",
	properties: {
		success: { type: "boolean" },
		status: { type: "integer" },
		message: { type: "string" },
		user: {
			type: "object",
			properties: {
				id: { type: "integer" },
				firstName: { type: "string" },
				lastName: { type: "string" },
				username: { type: "string" },
				active: { type: "boolean" },
				birthday: { type: "string" },
				UserDetail: {
					type: "object",
					properties: {
						id: { type: "integer" },
						address: { type: "string" },
						latitudes: { type: "string" },
						longitudes: { type: "string" },
					},
				},
				createdAt: { type: "string" },
				updatedAt: { type: "string" },
			},
		},
	},
};

/** define an output schema for user profile update request */
const updateProfileRoute = {
	schema: {
		/** define swagger tag */
		tags: ["User"],
		/** define swagger summary */
		summary: "update user profile",
		/** define swagger ui content type */
		consumes: ["application/x-www-form-urlencoded"],
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** define API body data */
		body: {
			type: "object",
			properties: {
				address: {
					type: "string",
				},
				latitudes: {
					type: "number",
				},
				longitudes: {
					type: "number",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			200: updateProcessResponse,
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	handler: updateProfileHandler,
};

/** define an output schema for get profile request */
const getProfileRoute = {
	schema: {
		/** define swagger tag */
		tags: ["User"],
		/** define swagger summary */
		summary: "get user profile",
		/** define API security method for the API */
		security: [{ apiKey: [] }],
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			200: getUserProcessResponse,
		},
	},
	/**
	 * initialize pre handler method.
	 * this method is responsible for handling middlewares
	 * load order
	 */
	preHandler: [verifyAccessToken],
	/** define the handler related to the single product schema */
	handler: getProfileHandler,
};

export default function userRouters(fastify, options, done) {
	/**
	 * user profile update route
	 */
	fastify.patch("/update", updateProfileRoute);

	/**
	 * user get profile route
	 */
	fastify.get("/info", getProfileRoute);
	done();
}
