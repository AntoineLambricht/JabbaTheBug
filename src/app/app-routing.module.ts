import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ConnectionComponent } from './connection';
import { HomeComponent } from './home';

const routes: Routes = [
  // path: '**' => page not fund
  {path: 'connection',          component: ConnectionComponent},
  {path: 'home',                component: HomeComponent}
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
