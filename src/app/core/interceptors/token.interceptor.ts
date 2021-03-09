import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map, switchMap, tap } from 'rxjs/operators';

import { TokenService } from '@app/core/services/token.service';
import { CredentialsService } from '@app/core/services/credential.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.tokenService.getToken().pipe(
      mergeMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              //RoleId: '104',
              //PersonId: '621403',
              RequestID: Math.round(new Date().getTime() / 1000).toString(),
              Authorization: `${token}`,
              Accept: 'application/json'
            }
          });
        }
        return next.handle(request).pipe(
          tap(
            (event) => {
              if (event instanceof HttpResponse) {
                //    console.log('success in calling API : ', event);
              }
            },
            (error) => {
              if (error instanceof HttpErrorResponse) {
                //console.log('error in calling API token interceptor : ', error);
                if (error.status === 401) {
                  alert('Token Expired. Redirecting to login page');
                  this.credentialsService.setCredentials();
                  this.router.navigate(['/login'], { replaceUrl: true });
                }
              }
            }
          )
        );
      })
    );
  }
}
