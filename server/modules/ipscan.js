import Machine from '../models/machine.model';
import fs from 'fs';
import qrcode from './qrcode';

/*
	Create one machine in the database or update its values if it exists,
	put its active status to true or false accordingly of its existence
	in the iptable file
	*/
var createMachine = function(line, regEx) {
	line = line.slice(0, -1);
	var tab = line.split(regEx);

	for (var elem in tab) {
		tab[elem] = tab[elem].slice(1, -1);
	}

	if (!tab[0] || tab[0] === 'IP') {
		return;
	}

	var uri = qrcode('jabbathebug://' + tab[1])
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

			Machine.update({
					"name": tab[1]
				}, machineData, {
					upsert: true
				})
				.exec()
				.catch(err => {
					console.error(err);
				});
		})
		.catch(err => {
			console.error(err);
		});
}


exports.readfile = function(path) {
	var array = fs.readFileSync(path).toString().split("\n");
	var numLocal = path.slice(-7, -4);
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


	array.forEach(elem => {
		createMachine(elem, ';');
	});
}
