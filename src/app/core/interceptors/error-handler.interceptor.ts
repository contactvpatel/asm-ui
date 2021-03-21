import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AsmService } from '@app/modules/asm/asm.service';
import { msgTitle, msgType } from '@app/shared/constants/global.constant';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private asmService: AsmService,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.asmService.showLoader();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body?.succeeded === false) {
            let listofMessages = [];
            let toastMessage = '';
            event.body.errors?.forEach((error) => {
              listofMessages.push(error.message);
            });
            toastMessage = listofMessages.join('\n');
            this.messageService.add({
              severity: msgType.error,
              summary: msgTitle.error,
              detail: toastMessage
            });
          }
        }
        return event;
      }),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    if (response.status == 403) {
      localStorage.clear();
      // this.authenticationService.logout()
      this.asmService.hideLoader();
      // window.location.href = environment.SSOURL + 'Home/SignIn?client_id=' + clientId + '&client_key=' + clientSecret + '&redirect_uri=' + window.location.origin + '/application/';
      this.router.navigate(['/signedout']);
      //this.router.navigate(['/auth/login'], { replaceUrl: true });
    }

    if (!environment.production) {
      // Do something with the error
      //log.error('Request error', response);
      this.asmService.hideLoader();
    }

    if (response.status == 0) {
      // navigate if api not working
    } else {
      let listofMessages = [];
      let toastMessage = '';
      response.error?.errors?.forEach((error) => {
        listofMessages.push(error.message);
      });
      toastMessage = listofMessages.join('\n');
      this.messageService.add({
        severity: msgType.error,
        summary: msgTitle.error,
        detail: toastMessage
      });
    }

    throw response;
  }
}
