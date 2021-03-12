import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';

import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from '@app/data/services/common.service';
import { AsmService } from '@app/modules/asm/asm.service';

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private ngxService: NgxUiLoaderService,
    public router: Router,
    private asmService: AsmService // private authenticationService: AuthenticationService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.asmService.showLoader();
    //-this.ngxService.start();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //-this.ngxService.stop();
          this.asmService.hideLoader();
        }
        return event;
      }),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    //log.error('Request error 1', response);
    if (response.status == 403) {
      localStorage.clear();
      // this.authenticationService.logout()
      //-this.ngxService.stop();
      this.asmService.hideLoader();
      // window.location.href = environment.SSOURL + 'Home/SignIn?client_id=' + clientId + '&client_key=' + clientSecret + '&redirect_uri=' + window.location.origin + '/application/';
      this.router.navigate(['/signed-out']);
      //this.router.navigate(['/403']);
      //this.router.navigate(['/auth/login'], { replaceUrl: true });
    }

    if (!environment.production) {
      // Do something with the error
      //log.error('Request error', response);
      //-this.ngxService.stop();
      this.asmService.hideLoader();
    }
    //-this.ngxService.stop();
    this.asmService.hideLoader();
    throw response;
  }
}
