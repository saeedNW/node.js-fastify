/** import fastify swagger module */
import fastifySwagger from "@fastify/swagger";
/** import fastify swagger ui module */
import fastifySwaggerUi from "@fastify/swagger-ui";
/** import fastify form body */
import fastifyFormBody from "@fastify/formbody";

/**
 * swagger and swagger ui configuration and initialization
 * @param {object} fastify - the fastify instance
 */
export default function swaggerInitializer(fastify) {
	/** register fastify form body  */
	fastify.register(fastifyFormBody);
	
	/** register fastify swagger module */
	fastify.register(fastifySwagger, {
		/** swagger configuration */
		swagger: {
			info: {
				/** swagger doc title */
				title: "Fastify Swagger",
				/** swagger doc description */
				description: "Fastify API documentation",
				/** API version */
				version: "1.0.0",
			},
			/** swagger categories tags */
			tags: [
				{ name: "Products", description: "Application products management" },
				{ name: "Auth", description: "Application authentication management" },
			],
			/** supported schemes */
			schemes: ["http"],
			/** swagger doc APIs security definitions */
			securityDefinitions: {
				apiKey: {
					/** type of the definition */
					type: "apiKey",
					/** definition value location */
					in: "header",
					/** definition value name */
					name: "authorization",
				},
			},
			/**
			 * TODO: activate swagger security for every API
			 ** Add this option => security: [{ apiKey: [] }],
			 */
		},
	});

	/** register fastify swagger ui module */
	fastify.register(fastifySwaggerUi, {
		/** prefix for accessing the swagger ui */
		prefix: "api-doc",
		/** expose the Swagger UI router to access its routes */
		exposeRouter: true,
	});
}
