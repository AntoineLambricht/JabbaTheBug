import express from 'express';

import machineCtrl from '../controllers/machine.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/machines/ - return all machines */
    .get(machineCtrl.getAllMachines)
    /** POST /api/machines/ - add/update machines from IPScan file*/
    .post()

export default router;