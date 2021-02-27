import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import jwt_decode from 'jwt-decode';

import { TokenService } from '@app/core/services/token.service';
import { CredentialsService } from '@app/core/services/credential.service';
import { CommonService } from '@app/data/services/common.service';

import { ApiConstants } from '@app/shared/constants/api.constant';

import { environment } from '@env/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'asm-ui';
  constructor(
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private credentialsService: CredentialsService,
    private route: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('auth');
    const tempuser = localStorage.getItem('authenticationInfo');
    if (!myParam && !tempuser) {
      this.route.navigate(['asm/home']);
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      const auth = params.auth;
      if (auth) {
        const res = JSON.parse(decodeURI(auth));
        this.tokenService.setToken(res.token);
        const decoded = jwt_decode(res.token);
        const obj = {
          // UserId: decoded..uid,
          // UserToken: res.token
        };
        this.commonService
          .post(ApiConstants.SaveUserAuthInfo.SaveUserData, obj)
          .subscribe(() => {
            this.credentialsService.setCredentials(res, true);
            localStorage.setItem('authenticationInfo', res.authenticationInfo);
            this.route.navigate(['asm/home']);
          });
      }
    });
    this.primengConfig.ripple = true;
  }
}
