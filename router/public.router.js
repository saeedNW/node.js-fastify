export default function publicRoutes(fastify, options, done) {
	/**
	 * create a simple route with fastify
	 */
	fastify.get("/", (req, reply) => {
		reply.send({
			message: "Hello from fastify",
		});
	});

	done();
}
