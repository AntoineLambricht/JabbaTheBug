import {Component, OnInit, ViewChild} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import { MachineService } from '../services';


const URL = 'http://jabbathebug.tircher.be/api/machine'

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  constructor(private machineService : MachineService) {

  }
  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.machineService.upload(formData);
    }
  }


  ngOnInit() {




  }



}
