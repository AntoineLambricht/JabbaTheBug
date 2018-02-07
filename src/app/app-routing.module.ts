import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ConnectionComponent } from './connection';

const routes: Routes = [
  // path: '**' => page not fund
  {path: 'connection',          component: ConnectionComponent}
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
