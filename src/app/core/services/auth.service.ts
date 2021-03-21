import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/core/services/credential.service';
import { HttpService } from '@app/core/services/http.service';
import { TokenService } from '@app/core/services/token.service';
import { UserAuthApi } from '@app/shared/constants/api.constant';
import { deviceId } from '@app/shared/constants/global.constant';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginContext {
  userName: string;
  password: string;
  rememberDevice?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private tokenService: TokenService,
    private credentialsService: CredentialsService
  ) {}

  requestToken(): Observable<any> {
    let httpHeader = new HttpHeaders();
    httpHeader = httpHeader.set('Device-ID', deviceId);
    httpHeader = httpHeader.set('Client-ID', environment.ssoClientId);
    httpHeader = httpHeader.set('Client-Secret', environment.ssoClientSecret);
    httpHeader = httpHeader.set('Application-ID', environment.applicationId);
    return this.httpService
      .post(
        environment.ssoApiUrl + UserAuthApi.RequestToken,
        { resourceUri: '' },
        { headers: httpHeader }
      )
      .pipe(
        map((data: any) => {
          this.tokenService.setToken(data.requestToken);
          return data;
        })
      );
  }

  login(context: LoginContext): Observable<any> {
    return this.httpService
      .post(environment.ssoApiUrl + UserAuthApi.Login, context)
      .pipe(
        map((res: any) => {
          this.tokenService.setToken(res.token);
          this.credentialsService.setCredentials(res, context.rememberDevice);
          return res;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    return this.httpService
      .post(environment.ssoApiUrl + UserAuthApi.Logout, {})
      .pipe(
        map((res: any) => {
          this.credentialsService.setCredentials();
          return res;
        })
      );
  }
}
