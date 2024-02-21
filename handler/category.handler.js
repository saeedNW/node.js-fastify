/** import category model */
import { Category } from "../models/category.model.js";

/**
 * Finds a category by its ID.
 * @param {number} id - The ID of the category to find.
 * @param {Object} reply - The reply object to send response.
 * @returns {Promise<Object>} - A promise that resolves to the found category object or null if not found.
 */
async function findOneCategory(id, reply) {
	/** Finding the category in the database */
	const category = await Category.findOne({
		where: {
			id,
		},
	});

	/** If category is not found, send a 404 response */
	if (!category) {
		return reply.status(404).send({
			message: "Category not found",
		});
	}

	/** If category is found, return the category object */
	return category;
}

/**
 * Creates a new category with the provided name and ParentId.
 * @param {Object} req - The request object containing the category information in req.body.
 * @param {Object} reply - The reply object to send response.
 * @returns {Promise<void>} - A promise that resolves once the category is created and saved.
 */
export const createNewCategory = async (req, reply) => {
	/** Extracting name and ParentId from request body */
	const { name, ParentId } = req.body;

	/** Checking if category with the same name already exists */
	const category = await Category.findOne({
		where: {
			name,
		},
	});

	/** If category with the same name exists, send a 400 Bad Request response */
	if (category) {
		return reply.status(400).send({
			message: "Category name already exists",
		});
	}

	/** Creating a new category with the provided name and ParentId */
	const newCategory = await Category.create({
		name,
		ParentId,
	});

	/** Saving the new category */
	await newCategory.save();

	/** Sending a success response */
	reply.send({
		message: "Created category successfully",
	});
};

/**
 * Updates the name of a category with the provided ID.
 * @param {Object} req - The request object containing the category ID in req.params and updated category information in req.body.
 * @param {Object} reply - The reply object to send response.
 * @returns {Promise<void>} - A promise that resolves once the category is updated and saved.
 */
export const updateCategory = async (req, reply) => {
	/** Extracting category ID and updated name from request parameters and body */
	const { id } = req.params;
	const { name } = req.body;

	/** Finding the category by ID */
	const category = await findOneCategory(id, reply);

	/** Setting the new name for the category */
	category.setDataValue("name", name);

	/** Saving the updated category */
	await category.save();

	/** Sending a response with the updated category */
	reply.send({
		category,
	});
};

/**
 * Retrieves all top-level categories with their children categories.
 * @param {Object} req - The request object.
 * @param {Object} reply - The reply object to send response.
 * @returns {Promise<void>} - A promise that resolves once all categories are retrieved and sent as a response.
 */
export const getAllCategories = async (req, reply) => {
	/** Finding all top-level categories with their children categories */
	const categories = await Category.findAll({});

	/** Sending a 200 OK response with the retrieved categories */
	reply.status(200).send({
		categories,
	});
};

/**
 * Retrieves a single category by its ID.
 * @param {Object} req - The request object containing the category ID in req.params.
 * @param {Object} reply - The reply object to send response.
 * @returns {Promise<void>} - A promise that resolves once the category is retrieved and sent as a response.
 */
export const getOneCategory = async (req, reply) => {
	/** Extracting category ID from request parameters */
	const { id } = req.params;

	/** Finding the category by ID */
	const category = await findOneCategory(id, reply);

	/** Sending a 200 OK response with the retrieved category */
	reply.status(200).send({
		category,
	});
};

/**
 * Removes a category by its ID.
 * @param {Object} req - The request object containing the category ID in req.params.
 * @param {Object} reply - The reply object to send response.
 * @returns {Promise<void>} - A promise that resolves once the category is removed.
 */
export const removeCategory = async (req, reply) => {
	/** Extracting category ID from request parameters */
	const { id } = req.params;

	/** Finding the category by ID */
	const category = await findOneCategory(id, reply);

	/** Destroying (deleting) the category */
	await category.destroy();

	/** Sending a response confirming the deletion */
	reply.send({ message: `Deleted category successfully` });
};
