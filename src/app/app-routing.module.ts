import { NgModule } from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { ConnectionComponent }  from './connection';
import { MachineComponent }     from './machine';
import { BugComponent }         from './bug';

const routes: Routes = [
  // path: '**' => page not fund
  
  {path: 'connection',            component: ConnectionComponent},
  {path: 'machine',               component: MachineComponent},
  {path: 'bug',                   component: BugComponent}
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
