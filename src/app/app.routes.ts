import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

import { ConnectionComponent } from './connection';
//import { PageNotFoundComponent } from './page-not-found';

export const ROUTES: Routes = [
  { path: '',                       component: ConnectionComponent},
//  { path: '**',                     component: PageNotFoundComponent},
];