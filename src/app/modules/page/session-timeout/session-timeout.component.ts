import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core/services/credential.service';
import { clientId, clientSecret } from '@app/shared/constants/global.constant';
import { environment } from '@env/environment';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss']
})
export class SessionTimeoutComponent implements OnInit {
  loginLink: string = environment.ssoLoginUrl;
  clientId: string = clientId;
  clientSecret: string = clientSecret;
  constructor(private credentialsService: CredentialsService) {
    this.credentialsService.removeCredentials();
  }

  ngOnInit() {}
}
