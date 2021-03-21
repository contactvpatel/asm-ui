import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core/services/credential.service';
import { TokenService } from '@app/core/services/token.service';
import { CommonService } from '@app/data/services/common.service';
import { ApiConstants } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-asm-auth',
  templateUrl: './asm-auth.component.html',
  styleUrls: ['./asm-auth.component.scss']
})
export class AsmAuthComponent implements OnInit {
  auth: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private credentialsService: CredentialsService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    if (environment.ssoEnabled) {
      const myParam = urlParams.get('auth');
      if (!myParam) {
        this.router.navigate(['signedout']);
      }
      this.activatedRoute.queryParams.subscribe((params) => {
        const auth = params['auth'];
        if (auth) {
          let res = JSON.parse(decodeURI(auth));
          this.tokenService.setToken(res.token);
          var decoded = jwt_decode(res.token);
          var obj = {
            UserId: decoded.uid,
            UserToken: res.token
          };
          this.commonService
            .post(ApiConstants.SaveUserAuthInfo.SaveUserData, obj)
            .subscribe(() => {
              this.credentialsService.setCredentials(res, true);
              localStorage.setItem(
                'authenticationInfo',
                res.authenticationInfo
              );
              this.router.navigate(['asm/home']);
            });
        } else {
          this.router.navigate(['signedout']);
        }
      });
    } else {
      this.router.navigate(['asm/home']);
    }
  }
}
