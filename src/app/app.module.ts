import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { HttpModule }           from '@angular/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { ConnectionService }    from './services';
import { MachineService }       from './services'

import { AppComponent }         from './app.component';
import { ConnectionComponent }  from './connection/connection.component';
import { AppRoutingModule }     from './app-routing.module';
import { MachineComponent }     from './machine/machine.component';
//import { MachineComponent } from './machine/machine.component';
import {FileSelectDirective}    from "ng2-file-upload";

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    MachineComponent,
    //MachineComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
    //FormBuilder,
    //FormGroup,
    //Validators
  ],
  providers: [
    ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
