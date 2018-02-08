import Machine from '../models/machine.model';
import fs from 'fs';
import qrcode from './qrcode'

var createMachine = function(tab) {

	//check for the header
	if (!tab[0] || tab[0] == "IP") {
		return;
	}
	//generate the qrcode for the entry
	qrcode('jabbathebug://' + tab[1])
		.then(uri => {
			var machineData = {
				name: tab[1],
				ip: tab[0],
				macaddress: tab[2],
				comment: tab[3],
				local: "0" + tab[0].split(".")[2],
				active: true,
				qrcode: uri
			};

			var option = {
				upsert: true
			};

			Machine.update({
					"name": tab[1]
				}, machineData, option)
				.exec()
				.catch(err => {
					err.message;
				});
		})
		.catch(err => {
			console.error(err);
		})

}

//read data from a json and update the actives to be ready for treatment
exports.readfile = function(tableau) {
	var numLocal = "0" + tableau[1][0].split(".")[2];
	numLocal + "";
	console.log("le num du local " + numLocal);
	Machine.update({
			"local": numLocal
		}, {
			$set: {
				"active": false
			}
		}, {
			multi: true
		})
		.exec()
		.catch(err => {
			err.message
		});

	tableau.forEach(elem => {
		createMachine(elem);
	});
}
