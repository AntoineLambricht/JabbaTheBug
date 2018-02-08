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
  selectedAll = false;


  constructor(private _api: ApiService) { 
  }

  ngOnInit() {
   this.refreshList();
  }

  refreshList(){
    this._api.getAllMachines()
    .subscribe(machines=>{
      this.listMachine = machines
    });
  }

  selectAll() {
    this.listMachine.forEach(element => {
      element.checked = this.selectedAll
    });
  }
  checkIfAllSelected() {
    this.selectedAll = this.listMachine.every(function(item:any) {
        return item.checked == true;
      })
  }

  getQr(){
    console.log(this.listMachine.filter(machine=>machine.checked===true))
    var list =  this.listMachine.filter(machine=>machine.checked===true)
    if(list.lenght!==0){
      this._api.getQr(list).subscribe();
    }

  }

  

}
