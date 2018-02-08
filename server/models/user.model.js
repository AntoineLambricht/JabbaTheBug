import Promise from 'bluebird';
import config from '../config/config';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt-nodejs');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	mail: {
		type: String,
		required: true,
		match: [/^[a-z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4}$/, 'The value of path {PATH} ({VALUE}) is not a valid email.']
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

UserSchema.methods.generateHash = ((password) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}),
	// UserSchema.methods.validPassword = ((password) =>{
	//   var user = this
	//   return bcrypt.compareSync(password, user.password);

	// }),

	UserSchema.methods.comparePassword = function(candidatePassword) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
				if (err) reject(err);
				resolve(isMatch);
			});
		})

	},

	UserSchema.methods.generateJwt = function() {
		var expiry = new Date();
		expiry.setDate(expiry.getDate() + 7);

		return jwt.sign({
			_id: this._id,
			mail: this.mail,
			username: this.username,
			firstname: this.firstname,
			lastname: this.lastname,
			exp: parseInt(expiry.getTime() / 1000),
		}, config.jwtSecret);
	}
/**
 * Statics
 */
UserSchema.statics = {
	/**
	 * Get user
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	get(id) {
		return this.findById(id, {
				password: 0,
				createdAt: 0
			})
			.exec()
			.then((user) => {
				if (user) {
					return user;
				}
				const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	},

	/**
	 * Get user by name
	 * @param {String} username - The username.
	 * @returns {Promise<User, APIError>}
	 */
	getWithLogin(login) {
		return this.findOne({
				$or: [{
					username: login
				}, {
					mail: login
				}]
			})
			.exec()
			.then((user) => {
				if (user) {
					return user;
				}
				return null;
			});
	},

	getAll() {
		return this.find({})
			.exec()
			.catch(err => {
				console.error(err);
			})
	},

	/**
	 * check if the username is unique
	 * @param {String} name - The username of user.
	 * @returns {Promise<User, APIError>}
	 */
	checkUsernamePresent(name) {
		return this.findOne({
				username: name
			}, {
				password: 0,
				createdAt: 0
			})
			.exec()
			.then((user) => {
				if (user) {
					const err = new APIError('This username is used', httpStatus.CONFLICT, true);
					return Promise.reject(err);
				}
				return null;
			});
	},
	/**
	 * check if the email is unique
	 * @param {String} email - The email of user.
	 * @returns {Promise<User, APIError>}
	 */
	checkEmailPresent(email) {
		return this.findOne({
				mail: email
			}, {
				password: 0,
				createdAt: 0
			})
			.exec()
			.then((user) => {
				if (user) {
					const err = new APIError('This email is used', httpStatus.CONFLICT, true);
					return Promise.reject(err);
				}
				return null;
			});
	},
	/**
	 * List users in descending order of 'createdAt' timestamp.
	 * @param {number} skip - Number of users to be skipped.
	 * @param {number} limit - Limit number of users to be returned.
	 * @returns {Promise<User[]>}
	 */
	list({
		skip = 0,
		limit = 50
	} = {}) {
		return this.find()
			.sort({
				createdAt: -1
			})
			.skip(+skip)
			.limit(+limit)
			.exec();
	}
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
