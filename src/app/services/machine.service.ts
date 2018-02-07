import { Injectable, OnInit }               from '@angular/core';
import { Http, Headers, RequestOptions }    from '@angular/http';

import { Machine } from '../models/machine';
import { MachineComponent } from '../machine/index';

@Injectable()
export class MachineService{
    
    listMachines = [];
    
    constructor(private _http: Http){}

    ngOnInit(){
        //this.getMachines();
    }

    getMachines(){
        console.log("Im GtMachine")
        this.listMachines = [];
        this._http.get("/api/machines")
            .subscribe(
                (response)=>{
                    var listJson = response.json();
                    console.log(this.listMachines);
                    for (var i=0; i< listJson.length; i++){
                        this.listMachines.push(new Machine(listJson[i].id, 
                            listJson[i].ip,
                            listJson[i].name,
                            listJson[i].comment,
                            listJson[i].macadress,
                            listJson[i].local,
                            listJson[i].active
                        ));
                    }
                }, (err) => {
                    console.log("Get Machines Fail");
                }
            );
    }
}