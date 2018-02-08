import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PapaParseService } from 'ngx-papaparse'
import 'rxjs/Rx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  providers: [ApiService]
})
export class MachineComponent implements OnInit {

  listMachine: any = [];
  selectedAll = false;

  color="";

  constructor(private _api: ApiService, private _papa: PapaParseService) {
  }

  ngOnInit() {
    this.refreshList();
  }

  upload(event: any) {
    let files = event.target.files;
    let file = files[0];

    var fichier = [];
    var api = this._api;
    this._papa.parse(file, {
      complete: function (this, results) {
        fichier = results.data;
        api.uploadFile(fichier)
          .subscribe((response) => {
            this.refreshList()
            return response;
          }, (err) => {
            console.error(err);
          });
      }
    });
  }

  refreshList() {
    this._api.getAllMachines()
      .subscribe(machines => {
        this.listMachine = machines
      });
  }

  selectAll() {
    this.listMachine.forEach(element => {
      element.checked = this.selectedAll
    });
  }
  checkIfAllSelected() {
    this.selectedAll = this.listMachine.every(function (item: any) {
      return item.checked == true;
    })
  }

  getQr() {
    var list = this.listMachine.filter(machine => machine.checked === true)
    console.log(list,list.length) 
    if (list.length > 0) {
      this._api.getQr(list).subscribe(data => {
        //data is a blob
        FileSaver.saveAs(data, "qrcode.pdf")}
      );
    }

  }



}
