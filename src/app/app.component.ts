import { Component } from '@angular/core';
import { ConnectionService } from './services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Jabba the Bug';
  
  bugActive: string;
  machineActive: string;

  constructor(private _router: Router,
    private conn: ConnectionService){}

  ngOnInit() {
    this._router.navigate(['connection']);
    
  }

}
