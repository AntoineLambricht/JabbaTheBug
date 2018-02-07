import { Component, OnInit }  from '@angular/core';
import { ConnectionService }  from './service';
import { Http }               from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConnectionService],
})
export class AppComponent {
  connected:boolean = false;
  
  title = 'Jabba the Bug';

  changeConnected(){
    this.connected = !this.connected;
  }
  //constructor(private _http: Http){}
  
}
