import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core/services/credential.service';
import { HttpService } from '@app/core/services/http.service';
import { TokenService } from '@app/core/services/token.service';
import { environment } from '@env/environment';

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
    private httpService: HttpService,
    private tokenService: TokenService,
    private credentialsService: CredentialsService
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
        } else {
          this.router.navigate(['signedout']);
        }
      });
    } else {
      this.router.navigate(['asm/home']);
    }
  }
}
