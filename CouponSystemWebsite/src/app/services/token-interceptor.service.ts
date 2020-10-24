import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoService } from './auto.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //let autoService = this.injector.get(AutoService);
    let token: string;
    token = sessionStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(request);
  }
}
