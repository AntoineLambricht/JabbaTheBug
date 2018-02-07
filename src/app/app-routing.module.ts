import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ConnectionComponent } from './connection';
import { HomeComponent } from './home';
import {MachineComponent} from "./machine";

const routes: Routes = [
  // path: '**' => page not fund
  {path: 'connection',          component: ConnectionComponent},
  {path: 'home',                component: HomeComponent},
  {path: 'machine',                component: MachineComponent}
]

@NgModule({
  imports : [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})


export class AppRoutingModule { }
