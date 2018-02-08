import { Component, OnInit }  from '@angular/core';
import { ApiService }         from '../services';
import { DomSanitizer }       from '@angular/platform-browser';
import { IBug }               from './IBug';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css'],
  providers: [ApiService]
})
export class BugComponent implements OnInit {

  listBug: any = [];
  listMachine: any= [];

  activ: boolean;
  inactiv: boolean;
  resolved: boolean;

  constructor(private _api: ApiService, 
    private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this._api.getAllMachines()
    .subscribe(machines=>{
      this.listMachine = machines
      this._api.getAllBugs()
        .subscribe(bugs => {
        this.listBug = bugs;
        this.correspMachBug();
        console.log(this.listBug);
      });
    });
  }

  details (bug: IBug){
    bug.showDetails = !bug.showDetails;
  }

  changeCheck(id: string, status:boolean){
    var bug= {};
    bug["bug_id"] = id;
    bug["status_info"] = status;
    this._api.changeBugStatus(bug)
      .subscribe(response => {
        console.log("Status Changed");
      });
  }

  private correspMachBug(){
    this.listBug.forEach(element => {
      var bugMachName = element.machinename;
      element["showDetails"] = false;
      element["machine"] = this.listMachine.find(x => x.name === bugMachName);
    });
  }
  
}


