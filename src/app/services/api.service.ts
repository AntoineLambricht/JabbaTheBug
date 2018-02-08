import { Injectable }                 from '@angular/core';
import { Http, Headers , Response,RequestOptions }   from '@angular/http';
//import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'
import { Observable }                 from "rxjs/Observable";
import 'rxjs/Rx';
import { IMachine }                   from "../machine/IMachine";
import { IBug }                       from "../bug/IBug";
import { query } from '@angular/core/src/render3/instructions';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  private handleError(error: Response) {
    console.log("blblblb"+error)
    return Observable.throw(error.statusText);  
  } 

  getAllMachines(){
    return this._http
      .get("/api/machines")
      .map(machine => {
        return <IMachine[]>machine.json()
      })
      .catch(this.handleError)
  }

  getAllBugs(){
    return this._http
      .get("/api/bugs")
      .map(bug => {
        return <IBug[]>bug.json()
      })
      .catch(this.handleError)
  }

  getQr(list){   
    let query = "?"
    list.forEach(element => {
      query+="compList[]="+element.name+"&";
    });
    query = query.slice(0,-1);
    console.log(query)
    return this._http
      .get("/api/machines/qrcodes"+query)
      .catch(this.handleError)
      
  }

}
