import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core/services/credential.service';
import { HttpService } from '@app/core/services/http.service';
import { TokenService } from '@app/core/services/token.service';
import { environment } from '@env/environment';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationInfo } from './data/schema/authentication-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'asm-ui';
  topbarTheme: string = 'lightblue';
  menuTheme: string = 'light';
  layoutMode: string = 'light';
  menuMode: string = 'static';
  inlineMenuPosition: string = 'bottom';
  inputStyle: string = 'filled';
  ripple: boolean = true;
  isRTL: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private httpService: HttpService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    if (environment.ssoEnabled) {
      const myParam = urlParams.get('auth');
      let tempuser = localStorage.getItem('asm_authenticationInfo');
      if (!myParam && !tempuser) {
        this.router.navigate(['asm/home']);
      }
      this.activatedRoute.queryParams.subscribe((params) => {
        const auth = params['auth'];
        if (auth) {
          let res = JSON.parse(decodeURI(auth));
          this.tokenService.setToken(res.token);
          this.credentialsService.setCredentials(res, true);
          localStorage.setItem(
            'asm_authenticationInfo',
            res.authenticationInfo
          );
          /*
          this.httpService
            .get(environment.clientIpUrl, {
              headers: { 'Access-Control-Allow-Origin': '*' }
            })
            .subscribe((res: any) => {
              localStorage.setItem('clientIp', res.ip);
            });
          */
          this.router.navigate(['asm/home']);
        }
      });
    } else {
      this.router.navigate(['asm/home']);
    }
    this.primengConfig.ripple = true;
  }
}
