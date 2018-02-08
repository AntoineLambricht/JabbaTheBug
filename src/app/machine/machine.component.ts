import { Component, OnInit }  from '@angular/core';
import { ApiService }  from '../services/api.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  providers: [ApiService]
})
export class MachineComponent implements OnInit {

  listMachine : any = [];


  constructor(private _api: ApiService) { 
  }

  ngOnInit() {
   this._api.getAllMachines()
    .subscribe(machines=>{
      this.listMachine = machines
    });
  } 

}
