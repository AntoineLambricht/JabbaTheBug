import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ConnectionService } from './services';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MachineComponent } from './machine/machine.component';
import {FileSelectDirective} from "ng2-file-upload";

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    HomeComponent,
    MachineComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,

  ],
  providers: [
    ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
