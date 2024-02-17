import { registerHandler } from "../handler/auth.handler.js";

const successfulRegister = {
	type: "object",
	properties: {
		success: { type: "boolean" },
		status: { type: "integer" },
		message: { type: "string" },
	},
};

const registerRoute = {
	schema: {
		tags: ["Auth"],
		summary: "user register process management",
		/** define swagger ui content type */
		consumes: ["application/x-www-form-urlencoded"],
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
		response: {
			201: successfulRegister,
		},
	},
	handler: registerHandler,
};

export default function authRoutes(fastify, options, done) {
	fastify.post("/register", registerRoute);
	done();
}
