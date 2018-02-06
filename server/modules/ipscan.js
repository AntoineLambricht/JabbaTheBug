import MachineSchema from '../models/machine.model';
import fs from 'fs';

var createMachine = function(line, regEx) {
	var tab = line.split(regEx);

	var machineData = new MachineSchema({
		name: tab[1],
		ip: tab[0],
		macaddress: tab[2],
		comment: tab[3]
	});

	var local = machineData.ip.split(".")[2];

	machineData.save()
	//TODO ajouter la machine a la DB
	console.log(local)
}


exports.readfile = function(path) {
	var array = fs.readFileSync(path).toString().split("\n");
	for (var i in array) {
		console.log(array[i]);
		createMachine(i, ";")
	}
}



//readfile("D:\\3BIN\\Projet web\\workspace\\JabbaTheBug\\ipscan019.txt")
