import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection';


@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
