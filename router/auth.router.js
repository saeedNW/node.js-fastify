/** import auth handlers */
import { loginHandler, registerHandler } from "../handler/auth.handler.js";

/** define response structure */
const processResponse = {
	type: "object",
	properties: {
		success: { type: "boolean" },
		status: { type: "integer" },
		message: { type: "string" },
	},
};

/** define success login response structure */
const loginResponse = {
	type: "object",
	properties: {
		success: { type: "boolean" },
		status: { type: "integer" },
		message: { type: "string" },
		data: {
			type: "object",
			properties: {
				accessToken: { type: "string" },
			},
		},
	},
};

/** define an output schema for register request */
const registerRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Auth"],
		/** define swagger summary */
		summary: "user register process management",
		/** define swagger ui content type */
		consumes: ["application/x-www-form-urlencoded"],
		/** define API body data */
		body: {
			type: "object",
			/** define required fields */
			required: ["username", "password"],
			properties: {
				username: {
					type: "string",
					description: "account's username",
				},
				password: {
					type: "string",
					description: "account's password",
				},
				firstName: {
					type: "string",
					description: "users's first name",
				},
				lastName: {
					type: "string",
					description: "users's last name",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			201: processResponse,
		},
	},
	/** define the handler related to the register schema */
	handler: registerHandler,
};

/** define an output schema for login request */
const loginRoute = {
	schema: {
		/** define swagger tag */
		tags: ["Auth"],
		/** define swagger summary */
		summary: "user login process management",
		/** define swagger ui content type */
		consumes: ["application/json"],
		/** define API body data */
		body: {
			type: "object",
			/** define required fields */
			required: ["username", "password"],
			properties: {
				username: {
					type: "string",
					description: "account's username",
				},
				password: {
					type: "string",
					description: "account's password",
				},
			},
		},
		/** Define the responses for this schema */
		response: {
			/** Response for HTTP status code 200 (OK) */
			200: loginResponse,
			/** Response for HTTP status code 401 (UNAUTHORIZED) */
			401: processResponse,
		},
	},
	/** define the handler related to the login schema */
	handler: loginHandler,
};

export default function authRoutes(fastify, options, done) {
	/**
	 * register process route
	 */
	fastify.post("/register", registerRoute);

	/**
	 * login process route
	 */
	fastify.post("/login", loginRoute);

	done();
}
