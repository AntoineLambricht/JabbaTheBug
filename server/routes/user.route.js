import express from 'express';
import passport from 'passport'
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** */
  .get(passport.authenticate('jwt',{session : false}),userCtrl.get)
  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);


//not necessary if no one can look for other users

// router.route('/:userId',passport.authenticate('jwt',{session : false}))
//   /** GET /api/users/:userId - Get user */
//   //.get(userCtrl.get)

//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), userCtrl.update)

//   /** DELETE /api/users/:userId - Delete user */
//   .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
//router.param('userId', userCtrl.load);

export default router;