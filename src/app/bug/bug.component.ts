import { Component, OnInit }  from '@angular/core';
import { ApiService }         from '../services';
import { IBug } from './IBug';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css'],
  providers: [ApiService]
})
export class BugComponent implements OnInit {

  listBug: any = [];

  constructor(private _api: ApiService) {}

  ngOnInit() {
    this._api.getAllBugs()
      .subscribe(bugs => {
      this.listBug = bugs;
      console.log(this.listBug);
    });
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

}
