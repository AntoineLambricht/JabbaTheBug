import express from 'express';
import validate from 'express-validation'

import bugCtrl from '../controllers/bug.controller';
import paramValidation from '../config/param-validation';
import bugController from '../controllers/bug.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/bugs/ - return all bugs */
    .get(bugCtrl.getAllBugs)
    /** POST /api/bugs/ - add a new bug*/
    .post(validate(paramValidation.createBug),bugCtrl.newBug)

router.route('/status')
  /** POST /api/bugs/status/ - change the status of the bug */
  .post(bugCtrl.changeStatus)


export default router;
