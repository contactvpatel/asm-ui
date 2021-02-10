import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import jwt_decode from 'jwt-decode';

import { AuthenticationService } from '@app/core/services/auth.service';
import { TokenService } from '@app/core/services/token.service';
import { environment } from '@env/environment';
import { CommonService } from '@app/data/services/common.service';
import { clientId, clientSecret } from '@app/shared/constants/global.constant';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  screensize = 1360;
  currentscreensize = window.innerWidth;
  mobiletopbar = false;
  isCollapsedMainSearch = true;
  fname: string;
  changePaswordLink: string;
  token: string;
  redirectURL: string;
  redirectURLLogin: string;
  collapsed: boolean;
  clientId: string;
  clientSecret: string;
  loginLink: string;
  appMenuItem: MenuItem[];
  userMenu: MenuItem[];
  @ViewChild('loginButton', { static: true })
  loginButton: ElementRef<HTMLElement>;
  constructor(
    public commonService: CommonService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.redirectURL = window.location.origin + '/asm/home';
    this.redirectURLLogin = window.location.origin + '/asm/';
    this.changePaswordLink = environment.ssoLoginUrl + '/Home/ChangePassword';
    this.loginLink = environment.ssoLoginUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tokenService.getToken().subscribe((res) => {
      this.token = res;
      if (res) {
        let token = res.split('.');
        var decoded = jwt_decode(token[0] + '.' + token[1]);
        this.fname = decoded.fn;
      }
    });
    this.appMenuItem = [
      // {
      //   label:'File',
      //   icon:'pi pi-fw pi-file',
      //   items:[
      //     {
      //       label:'File',
      //       icon:'pi pi-fw pi-file',
      //     }
      //   ]
      // }
    ];
    this.userMenu = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-id-card',
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/signed-out'],
      },
    ];
  }

  logout() {
    localStorage.clear();
    this.authenticationService.logout().subscribe(() => {
      // window.location.href = environment.ssoLoginUrl + 'Home/SignIn?client_id=' + clientId + '&client_key=' + clientSecret + '&redirect_uri=' + window.location.origin + '/application/';
      // this.router.navigate(['/auth/login'], { replaceUrl: true });
      this.loginButton.nativeElement.click();
    });
  }

  topbartoggler() {
    this.mobiletopbar = !this.mobiletopbar;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.mobiletopbar = false;
  }
}
