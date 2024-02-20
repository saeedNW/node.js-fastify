/**
 * a simple example of middleware usage in fastify router.
 * you csn find the usage of this middleware in products router file.
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 * @param {function} next - fastify middie next function
 */
export const firstExample = (req, reply, next) => {
	console.log("Hello From Middleware1");
	next();
};

/**
 * a simple example of middleware usage in fastify router.
 * you csn find the usage of this middleware in products router file.
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 * @param {function} next - fastify middie next function
 */
export const secondExample = (req, reply, next) => {
	console.log("Hello From Middleware2");
	next();
};
