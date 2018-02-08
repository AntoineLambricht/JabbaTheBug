import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private conn : ConnectionService) { }

  ngOnInit() {
  
  }

}
