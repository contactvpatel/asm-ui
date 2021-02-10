import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CredentialsService } from './credential.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenValue = null;
  authenticationInfo: any = null;

  get token() {
    return this.tokenValue;
  }

  set token(token: any) {
    this.tokenValue = token;
  }

  // To avoid circular dependency we have used httpclient instead of httservice
  constructor(
    private injector: Injector,
    private credentialsService: CredentialsService
  ) {}

  getToken() {
    if (this.credentialsService.isAuthenticated) {
      if (this.token) {
        return of(this.token);
      } else {
        return of(
          this.credentialsService.credentials &&
            this.credentialsService.credentials.token
        );
      }
    }
    return of(this.token);
  }

  setToken(token: any) {
    this.token = token;
  }

  getUserData() {
    if (this.credentialsService.isAuthenticated) {
      if (this.authenticationInfo) {
        return this.authenticationInfo;
      } else {
        return (
          this.credentialsService.credentials &&
          this.credentialsService.credentials.authenticationInfo
        );
      }
    }
    return this.authenticationInfo;
  }
}
