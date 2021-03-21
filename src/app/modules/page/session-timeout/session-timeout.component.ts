import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/auth.service';
import { CredentialsService } from '@app/core/services/credential.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss']
})
export class SessionTimeoutComponent implements OnInit {
  loginLink: string = environment.ssoLoginUrl;
  clientId: string = environment.ssoClientId;
  clientSecret: string = environment.ssoClientSecret;
  constructor(
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService
  ) {
    if (this.credentialsService.isAuthenticated()) {
      this.credentialsService.removeCredentials();
      this.authenticationService.logout();
    }
  }

  ngOnInit() {}
}
