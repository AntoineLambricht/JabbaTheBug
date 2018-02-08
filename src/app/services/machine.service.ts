import {BaseRequestOptions, RequestOptions} from "@angular/http";
import { Injectable, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import {HttpParams} from "@angular/common/http";
import {getResponseURL} from "@angular/http/src/http_utils";

@Injectable()
export class MachineService {
    constructor(private http:Http){}

    upload(formData){
      /*let headers = new Headers();
      headers.append('Content-Type','application/json');
      let options = new RequestOptions({
        headers: headers
      });*/
      this.http.post('http://jabbathebug.tircher.be/api/machines', formData)
        .subscribe(
          (reponse) => {

          }, (err) => {

          }
        )
      //let options =  new RequestOptions({ headers: headers });
    }

 /* upload(formData, id) {
    let headers = this.tokenService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = new RequestOptions({ headers: headers });

    return this.tokenService.request({
      method: 'post',
      url: `http://localhost:3000/api/projects/${id}/upload`,
      body: formData,
      headers: options.headers
    }).map(res => res.json());
  }*/
}
