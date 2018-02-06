import express from 'express';
import validate from 'express-validation'

import bugCtrl from '../controllers/bug.controller';
import paramValidation from '../config/param-validation';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/bugs/ - return all bugs */
    .get()
    /** POST /api/bugs/ - add a new bug*/
    .post(validate(paramValidation.createBug),bugCtrl.newBug)

export default router;