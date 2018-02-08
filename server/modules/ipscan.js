import Machine from '../models/machine.model';
import fs from 'fs';
import qrcode from './qrcode'

var createMachine = function(tab) {


	/*for (var elem in tab) {
		tab[elem] = tab[elem].slice(1, -1);
	}*/
	console.log(tab);
	if (!tab[0] || tab[0] == "IP") {
		return;
	}

	qrcode('jabbathebug://'+tab[1]).then(uri => {
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
	
		console.log(tab[1])
	
		Machine.update({
				"name": tab[1]
			}, machineData, option)
			.exec()
			.catch(err => {
				err.message;
			});
	}).catch(e=>console.log(e))
	

	


	//TODO ajouter la machine a la DB
	//console.log(machineData.local)

}


exports.readfile = function(tableau) {
	//var array = fs.readFileSync(path).toString().split("\n");
	var numLocal = "0"+tableau[1][0].split(".")[2];
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



//readfile("D:\\3BIN\\Projet web\\workspace\\JabbaTheBug\\ipscan019.txt")