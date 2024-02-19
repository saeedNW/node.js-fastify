/** import user model */
import { User } from "../models/user.model.js";
/** import fastify server info */
import { fastify } from "../server.js";

/**
 * register process handler
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 */
export async function registerHandler(req, reply) {
	/** extract data from request body */
	const { username, password, firstName, lastName } = req.body;

	/** create new user data from model */
	const newUser = new User({
		username,
		password: await fastify.bcrypt.hash(password),
		firstName,
		lastName,
	});

	/** save user in database */
	await newUser.save();

	reply.send({
		success: true,
		status: 201,
		message: "user has been created successfully",
	});
}

/**
 * login process handler
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 * @returns {promise<void>}
 */
export async function loginHandler(req, reply) {
	/** extract data from request body */
	const { username, password } = req.body;

	/** find user data in database */
	const user = await User.findOne({
		where: { username },
	});

	/** return error if the user was not found */
	if (!user) {
		return reply.code(401).send({
			success: false,
			status: 401,
			message: "Invalid login info",
		});
	}

	/**
	 * user's password comparison result
	 * @type {boolean}
	 */
	const compareResult = await fastify.bcrypt.compare(password, user.password);

	/** return error if the password was not match */
	if (!compareResult) {
		return reply.code(401).send({
			success: false,
			status: 401,
			message: "Invalid login info",
		});
	}

	/** set user access token */
	const accessToken = fastify.jwt.sign(
		{ username },
		{ expiresIn: "1d", algorithm: "HS256" }
	);

	user.setDataValue("accessToken", accessToken);

	/** save user data in database */
	await user.save();

	return reply.send({
		success: false,
		status: 200,
		message: "logged in successfully",
		data: { accessToken },
	});
}
