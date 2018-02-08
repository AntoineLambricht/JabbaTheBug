import { Injectable }                 from '@angular/core';
import { Http, Headers , Response }   from '@angular/http';
import { Observable }                 from "rxjs/Observable";
import 'rxjs/Rx';
import { IMachine }                   from "../machine/IMachine";
import { IBug }                       from "../bug/IBug";

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

const httpOptionsUp = {
  headers: new Headers({ 'Content-Type': 'multipart/form-data' ,'Accept' : 'application/json'})

};

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  getAllMachines() : Observable<IMachine[]>{
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

  uploadFile(data : any){
    console.log("before upload", data);
    return this._http.post("/api/machines", data, httpOptions)
      .catch(this.handleError)
  }
  private handleData(res: Response) {
    let data = res.json();
    return data;
  }

  private handleErrorApi(error: Response | any) {
    return Observable.throw('API failed');
  }

}
