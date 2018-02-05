import User from '../models/user.model';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((userParam) => {
      req.userParam = userParam; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  var token;
  var password = req.body.password;
  var confirmed_password = req.body.confirmed_password;
  if(password === confirmed_password){
    User.checkUsernamePresent(req.body.username).then(function(){
      User.checkEmailPresent(req.body.mail).then(function(){
        const user = new User(req.body);
        user.password = user.generateHash(user.password);
        user.save()
          .then(savedUser => {
            token = user.generateJwt();
            res.cookie("jwt",token)
            savedUser.password = undefined;
            res.json(savedUser);
          })
          .catch(e => next(e));
      }).catch(e => next(e));
    }).catch(e => next(e));
  }else{  
    const err = new APIError('Invalide password or confirmed_password', httpStatus.BAD_REQUEST,true);
    next (err);
  }
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
