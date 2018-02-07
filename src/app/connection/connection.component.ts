import { Component, OnInit }    from '@angular/core';
import { ConnectionService }  from '../service';
import { Router, ActivatedRoute } from '@angular/router';
//import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
  providers: [ConnectionService],
})
export class ConnectionComponent implements OnInit {

  constructor(
    private _connection: ConnectionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {  }

  ngOnInit() { 
    //this._connection.setConnected() 
  }

  machine(){
    console.log("Bonjour machine")
    this._router.navigate[('/machine')], {relativeTo: this._route};
  }

}
