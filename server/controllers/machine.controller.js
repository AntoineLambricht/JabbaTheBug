import APIError from '../helpers/APIError';
import Machine from '../models/machine.model';
import pdf from '../modules/pdf';

function getAllMachines(req, res, next) {
	res.json(Machine.getAll())
	//TODO correct way with mongoose

	/*Machine.getAll()
	.then(machines => res.json(machines))
	.catch(e => next(e))*/
}

function getQRCodes(req, res) {
	pdf.generate(res, req.body.compList);
	res.status(200);
}

export default {
	getAllMachines,
	getQRCodes
};
