import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router'

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor{
    constructor(private _router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this._router.navigate(['connection'])
              }
            }
          })
        
    }
    
}