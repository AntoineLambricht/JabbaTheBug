import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { ConnectionService }      from './service';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent }           from './app.component';
import { DashboardComponent }     from './dashboard/dashboard.component';
import { HeroDetailComponent }    from './hero-detail/hero-detail.component';
import { HeroesComponent }        from './heroes/heroes.component';
import { HeroService }            from './hero.service';
import { MessageService }         from './message.service';
import { MessagesComponent }      from './messages/messages.component';

import { AppRoutingModule }       from './app-routing.module';
import { ConnectionComponent }    from './connection/connection.component';
import { MachineComponent }       from './machine/machine.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    ConnectionComponent,
    MachineComponent
  ],
  providers: [ HeroService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
