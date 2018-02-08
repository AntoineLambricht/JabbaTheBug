import { Injectable }                 from '@angular/core';
//import { Http, Headers , Response,RequestOptions ,ResponseContentType}   from '@angular/http';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'
import { Observable }                 from "rxjs/Observable";
import 'rxjs/Rx';
import { IMachine }                   from "../machine/IMachine";
import { IBug }                       from "../bug/IBug";
import { query } from '@angular/core/src/render3/instructions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  getAllMachines(){
    return this._http
      .get<IMachine[]>("/api/machines")
      .catch(this.handleError)
  }

  getAllBugs(){
    return this._http
      .get<IBug[]>("/api/bugs")
      .catch(this.handleError)
  }

  changeBugStatus(data: object){
    return this._http.post("/api/bugs/status", data, httpOptions)
        .catch(this.handleError);
  }

  getQr(list){   
    let query = "?"
    list.forEach(element => {
      query+="compList[]="+element.name+"&";
    });
    query = query.slice(0,-1);
    console.log(query)
    return this._http
      .get("/api/machines/qrcodes"+query,{responseType: 'blob'})
      .catch(this.handleError)
      
  }

  uploadFile(data : any){
    return this._http.post("/api/machines", data, httpOptions)
      .catch(this.handleError)
  }

}
