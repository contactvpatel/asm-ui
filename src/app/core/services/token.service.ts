import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationInfo } from '@app/data/schema/authentication-info';
import { of } from 'rxjs';
import { CredentialsService } from './credential.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenValue = null;
  authenticationInfo: AuthenticationInfo = null;

  get token() {
    return this.tokenValue;
  }

  set token(token: any) {
    this.tokenValue = token;
  }

  constructor(
    public router: Router,
    private credentialsService: CredentialsService
  ) {}

  getToken() {
    if (this.credentialsService.isAuthenticated()) {
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
