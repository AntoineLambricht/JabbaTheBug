import APIError from '../helpers/APIError';
import Machine from '../models/machine.model';
import pdf from '../modules/pdf';
import ipscan from '../modules/ipscan';

function getAllMachines(req, res, next) {
	Machine.getAll()
		.then(machines => res.json(machines))
		.catch(e => next(e));
}

//get the generated pdf for chosen machines
function getQRCodes(req, res) {
	pdf(res, req.query.compList);
	res.status(200);
}

//submit an ipscan JSON data ready to be added in the db
function postIPScan(req, res) {
	ipscan.readfile(req.body);
}

export default {
	getAllMachines,
	getQRCodes,
	postIPScan
};
