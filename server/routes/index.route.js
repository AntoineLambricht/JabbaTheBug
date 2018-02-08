import express from 'express';
import passport from 'passport';

import authRoutes from './auth.route';
import machineRoutes from './machine.route';
import userRoutes from './user.route';
import bugRoutes from './bug.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// authenticate user for accessing to all /machines routes
router.use('/machines', passport.authenticate('jwt', {session: false}));
// mount machines routes at /machines
router.use('/machines', machineRoutes);

// authenticate user for accessing to all /bugs routes
router.use('/bugs', passport.authenticate('jwt', {session: false}));
// mount users routes at /users
router.use('/bugs', bugRoutes);

//Not used yet
// mount users routes at /users
router.use('/users', userRoutes);

export default router;
