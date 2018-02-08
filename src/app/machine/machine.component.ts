import { Component, OnInit }  from '@angular/core';
import { ApiService }  from '../services/api.service';
import { PapaParseService } from 'ngx-papaparse'
@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  providers: [ApiService]
})
export class MachineComponent implements OnInit {

  listMachine : any = [];


  constructor(private _api: ApiService, private _papa: PapaParseService) {
  }

  upload(event: any) {
    let files = event.target.files;
    let file = files[0];

    var fichier = [];
    var api = this._api;
    this._papa.parse(file, {
      complete : function (this, results) {
        console.log("Finished:", results.data)

        fichier = results.data;
        console.log("zfkbzefkhhz",fichier)
        api.uploadFile(fichier)
          .subscribe((response)=> {
            console.log("api ok");
            return response;
          }, (err)=>{
            console.error(err);
          });
      }
    });



    //this._papa.parse(file, {
      //complete: function(results) {
        //console.log("Finished:", results.data);
        //var fichier = {};
        //fichier["fichier"] = results.data;
        //this._api.uploadFile(fichier);
      //}});

  }

  test(fichier){
    console.log("zfkbzefkhhz",fichier)
    this._api.uploadFile(fichier)
      .subscribe((response)=> {
        console.log("api ok");
        return response;
      }, (err)=>{
        console.error(err);
      });

  }

    handleResponse(response: any) {
      console.log(response);
    }
    handleError(error: string) {
      console.log(error);
    }






  ngOnInit() {
   this._api.getAllMachines()
    .subscribe(machines=>{
      this.listMachine = machines
    });
  }

}
