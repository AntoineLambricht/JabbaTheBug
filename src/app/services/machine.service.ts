import { Injectable, OnInit }               from '@angular/core';
import { Http, Headers, RequestOptions }    from '@angular/http';

@Injectable()
export class MachineService{
    
    machines = [];
    
    constructor(private _http: Http){}

    ngOnInit(){
        //this.getMachines();
    }

    getMachines(){
        console.log("Im GtMachine")
        this.machines = [];
        this._http.get("/api/machines")
            .subscribe(
                (response)=>{
                    var ret = response.json();
                    console.log(ret)
                }, (err) => {
                    console.log("Get Machines Fail");
                }
            );
    }
}