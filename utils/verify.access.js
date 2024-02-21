/** import user model */
import { User } from "../models/user.model.js";
/** import fastify server info */
import { fastify } from "../server.js";

/**
 * verify user JWT access token
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 * @returns {Promise<void>}
 */
export const verifyAccessToken = async (req, reply) => {
	/** get user access token from request headers */
	const token = getToken(req.headers, reply);

	/** verify jwt token */
	const result = fastify.jwt.verify(token);

	/** return error if the verification result was a string */
	if (typeof result === "string") {
		return reply.status(400).send({
			success: false,
			status: 400,
			message: result,
		});
	}

	/** extract username from JWT verification result */
	const { username } = result;

	/** retrieve user's data from database based on its username */
	const user = await User.findOne({
		where: {
			username,
		},
	});

	/** return error if user was not found */
	if (!user) {
		return reply.status(401).send({
			success: false,
			status: 401,
			message: "you need to login",
		});
	}

	/** add user data to request */
	req.user = user.dataValues;
};

/**
 * extract user access token from request headers
 * @param {object} headers - request headers data object
 * @param {object} reply - fastify reply object
 * @returns {*}
 */
function getToken(headers, reply) {
	/**
	 * get Barer token from request header.
	 * split token to "Barer" and token
	 */
	const [Barer, token] = headers?.authorization?.split(" ") || [];

	/**
	 * validate token to be a Bearer token.
	 * return token if token was valid
	 */
	if (token && ["Bearer", "bearer"].includes(Barer)) return token;

	/** return error if token was invalid */
	return reply.status(401).send({
		success: false,
		status: 401,
		message: "you need to login",
	});
}
