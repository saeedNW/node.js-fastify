/** import user related models */
import { User, UserDetail } from "../models/user.model.js";

/**
 * user update profile handler
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 * @returns {Promise<void>}
 */
export const updateProfileHandler = async (req, reply) => {
	/** extract data from request body */
	const body = {
		...req.body,
	};

	/** retrieve user's additional details from database */
	const userDetail = await UserDetail.findOne({
		where: {
			UserId: +req.user.id,
		},
	});

	if (userDetail) {
		/** update user's details if exists */
		await updateUserData(userDetail, body);
	} else {
		/** create new detail record for user if was not found */
		await createUserNewDetails(req, body);
	}

	/** send success response */
	return reply.status(200).send({
		success: true,
		status: 200,
		message: "updated user profile successfully",
	});
};

/**
 * retrieve user profile handler
 * @param {object} req - fastify request object
 * @param {object} reply - fastify reply object
 * @returns {Promise<void>}
 */
export const getProfileHandler = async (req, reply) => {
	/**
	 * retrieve user's data from database.
	 * join user's data with user's details.
	 */
	const user = await User.findOne({
		where: {
			id: req.user.id,
		},
		/** join user's details table to user data */
		include: [
			{
				model: UserDetail,
				as: "UserDetail",
				attributes: ["id", "address", "latitudes", "longitudes"],
			},
		],
	});

	return reply.status(200).send({
		success: true,
		status: 200,
		message: "process ended successfully",
		user: user.dataValues,
	});
};

/**
 * user's additional data updater helper function
 * @param {object} userDetail - user's additional data that
 * @param {object} data - user's new data which should be updated
 */
async function updateUserData(userDetail, data) {
	/** loop over data keys */
	for (const key in data) {
		/** proceed if the current key has a valid value */
		if (userDetail[key]) {
			/** set user's new additional data value */
			userDetail.setDataValue(key, data[key]);
		}
	}
	/** save user's details in database */
	await userDetail.save();
}

/**
 * create new user details.
 * @param {Object} req - fastify request object
 * @param {Object} data - user's new details that going to be added to user's data
 * @returns {Promise<void>}
 */
async function createUserNewDetails(req, data) {
	/** assign the UserId from the request user to the data */
	Object.assign(data, { UserId: req.user.id });
	/** create new user detail record using the provided data */
	const newUserDetail = await UserDetail.create(data);
	/** save new data in database */
	await newUserDetail.save();
}
