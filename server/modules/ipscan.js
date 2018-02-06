import Machine from '../models/machine.model';
import fs from 'fs';

var createMachine = function(line, regEx) {
	var tab = line.split(regEx);
  if(!tab[0] || tab[0]=="\"IP\""){return;}


  var machineData ={
    name: tab[1],
    ip: tab[0],
    macaddress: tab[2],
    comment: tab[3],
    local: "0" + tab[0].split(".")[2],
    active: true
  };

    var option = {upsert: true};

    console.log(tab[1])

    Machine.update({"name" : tab[1]},machineData,option)
      .exec()
      .catch(err=>{
        err.message;
      });


    //TODO ajouter la machine a la DB
    //console.log(machineData.local)

}


exports.readfile = function(path) {
	var array = fs.readFileSync(path).toString().split("\n");
	var numLocal = path.slice(-7,-4);
	numLocal+"";
	console.log("le num du local "+numLocal);
	Machine.update({"local" : numLocal},{$set:{"active" : false}},{multi: true})
    .exec()
    .catch(err=>{err.message});


	array.forEach(elem => {
		createMachine(elem, ";");
	});
}



//readfile("D:\\3BIN\\Projet web\\workspace\\JabbaTheBug\\ipscan019.txt")
