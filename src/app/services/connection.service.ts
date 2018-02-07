import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

const httpOptions = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class ConnectionService {

    connected:boolean;
    //path = "http://jabbathebug.tircher.be"
    constructor (private _http: Http, 
        private _router: Router){
            this.connected = false;
        }

    getConnected(){
        return this.connected;
    }
    changeConnected(){
        this.connected = !this.connected;
    }

    login(data: object): void {
        this._http.post('/api/auth/login', data, httpOptions)
            .subscribe(
            (response) => {
                //Change 
                this.changeConnected();
                this._router.navigate(['machine']);
                //this._alerteService.success("Welcome Back Boy");
            },
            (err) => {
                //this.error = err;
                console.log("Authentication Failed!")
                //this._alerteService.error("Authentication failed!");
            }
            );
    }

}