import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent implements OnInit {
  loginLink: string = environment.ssoLoginUrl;
  clientId: string = environment.ssoClientId;
  clientSecret: string = environment.ssoClientSecret;
  constructor() {}

  ngOnInit() {}
}
