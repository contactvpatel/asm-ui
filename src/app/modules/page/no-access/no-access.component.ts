import { Component, OnInit } from '@angular/core';
import { clientId, clientSecret } from '@app/shared/constants/global.constant';
import { environment } from '@env/environment';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss'],
})
export class NoAccessComponent implements OnInit {
  loginLink: string = environment.ssoLoginUrl;
  clientId: string = clientId;
  clientSecret: string = clientSecret;
  constructor() {}

  ngOnInit() {}
}
