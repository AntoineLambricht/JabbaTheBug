import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { HttpModule }           from '@angular/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';

import {FileSelectDirective}    from "ng2-file-upload";

import { AppComponent }         from './app.component';
import { BugComponent }         from './bug';
import { ConnectionComponent }  from './connection/connection.component';
import { MachineComponent }     from './machine/machine.component';
import { PapaParseModule }      from 'ngx-papaparse';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'

import { ApiRequestInterceptor } from './interceptors/apiRequest.insterceptor'
import { ConnectionService }    from './services';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    MachineComponent,
    FileSelectDirective,
    BugComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PapaParseModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ConnectionService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: ApiRequestInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
