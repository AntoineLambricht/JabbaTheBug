import { Component, OnInit }  from '@angular/core';
import { MachineService }     from '../services';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css'],
  providers: [MachineService]
})
export class MachineComponent implements OnInit {

  machines = [];

  constructor(private _machines: MachineService) { }

  ngOnInit() {
    this._machines.getMachines()
  }

}

// function getMachines(){

//}
