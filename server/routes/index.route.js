import express from 'express';
import passport from 'passport';

import authRoutes from './auth.route';
import machineRoutes from './machine.route';
import userRoutes from './user.route';

const router = express.Router(); 

// mount auth routes at /auth
router.use('/auth', authRoutes);

// authenticate user for accessing to all /machines routes 
router.use('/machines',passport.authenticate('jwt',{session : false}));
// mount machines routes at /machines
router.use('/machines',machineRoutes);

// mount users routes at /users
router.use('/users', userRoutes);

export default router;