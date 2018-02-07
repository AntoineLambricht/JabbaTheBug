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

    //path = "http://jabbathebug.tircher.be"
    constructor (private _http: Http, 
        private _router: Router){}

    login(data: object): void {
        this._http.post('/api/auth/login', data, httpOptions)
            .subscribe(
            (response) => {
                //Change route
                this._router.navigate(['home']);
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