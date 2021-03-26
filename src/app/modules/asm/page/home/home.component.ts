import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppBreadcrumbService } from '@app/layout/app.breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    public router: Router,
    private breadcrumbService: AppBreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: 'Home' }]);
  }

  ngOnInit(): void {}
}
