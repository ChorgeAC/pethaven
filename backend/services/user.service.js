const { User } = require("../models/index.js");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById({ _id: id });
  return user;
};

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log("Error...");
  }
};

/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 */

const createUser = async (user) => {
  const email = await User.isEmailTaken(user.email);
  if (email) {
    throw new ApiError(httpStatus.OK, "Email already taken");
  } else {
    try {
      const userObj = await User.create(user);
      return userObj;
    } catch (error) {
      if (error.code === 11000) {
        console.log("Failed to create new user");
      }
    }
  }
};

module.exports = {
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  createUser: createUser,
};
