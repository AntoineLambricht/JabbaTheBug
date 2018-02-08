import APIError from '../helpers/APIError';
import Bug from '../models/bug.model';
import Machine from '../models/machine.model';
import nodemailer from '../modules/nodemailer';

function getAllBugs(req, res, next) {
	Bug.getAll()
		.then(bugs => res.json(bugs))
		.catch(e => next(e))
}

function newBug(req, res, next) {
	var machinename = req.body.machinename
	Machine.getSome([machinename]).then(machines => {
		console.log("getSome : " + machines)
		if (machines.length === 1) {
			var bug = new Bug(req.body)
			bug.save()
				.then(savedBug => {
					res.json(savedBug);
					let structuredHtml = '<h1>JabbaTheBug was notified with a new bug</h1>';
					structuredHtml += '<p>Machine :<b>' + savedBug.machinename + '</b></p>';
					structuredHtml += '<hr><p>Mail of the sender :<b>' + savedBug.mailuser + '</b></p>';
					structuredHtml += '<hr><p>Description of the bug :<b>' + savedBug.descrip + '</b></p>';
					structuredHtml += '<hr><p>Photo : <img src="' + photo + '"/></p>';
					//sends an email to all admins
					nodemailer(structuredHtml);
				})
				.catch(e => next(e));
		} else {
			res.status(404);
			res.send("Machine non trouvée, contactez l'administrateur!")
		}

	}).catch(e => next(e))

}
/**
 * compBugList is an array which should be composed of
 * objects with the next format :
 *  {
 *    bug_id : <bugs._id>,
 *    status_info : 'true or false'
 *  }
 * */
function changeStatus(req, res, next) {
	Bug.update({
			'_id': req.body.bug_id
		}, {
			'statusinfo': req.body.status_info
		})
		.exec().then(res.status(200))
		.catch(err => {
			res.status(500);
			err.message;
		});
}

export default {
	getAllBugs,
	newBug,
	changeStatus
};
