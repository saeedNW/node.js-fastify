import { User } from "../models/user.model.js";
import { fastify } from "../server.js";

export async function registerHandler(req, reply) {
	const { username, password, firstName, lastName } = req.body;

	const newUser = new User({
		username,
		password: await fastify.bcrypt.hash(password),
		firstName,
		lastName,
	});
	await newUser.save();

	reply.send({
		success: true,
		status: 201,
		message: "user has been created successfully",
	});
}
