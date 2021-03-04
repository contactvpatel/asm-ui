import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AsmService } from './asm.service';

@Component({
  selector: 'app-asm',
  templateUrl: './asm.component.html',
  styleUrls: ['./asm.component.scss'],
})
export class AsmComponent implements OnInit {
  sidebarVisibility;
  sidebarMenuItems: MenuItem[];
  pageLoader: boolean;
  constructor(private asmService: AsmService, private asmservice: AsmService) {
    this.pageLoader = this.asmService.pageLoader;
    asmService.pageLoaderChange.subscribe((value) => {
      this.pageLoader = value;
    });
  }

  ngOnInit(): void {
    this.sidebarVisibility = true;
    this.sidebarMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/asm/home'],
      },
      {
        label: 'Application Security',
        icon: 'pi pi-fw pi-unlock',
        items: [
          {
            label: 'Module',
            icon: 'pi pi-fw pi-microsoft',
            routerLink: ['/asm/module'],
          },
          {
            label: 'Access Group',
            icon: 'pi pi-fw pi-tag',
            routerLink: ['/asm/application-security/access-group'],
          },
          {
            label: 'Access Group Assignment',
            icon: 'pi pi-fw pi-key',
            routerLink: ['/asm/access-group-assignment'],
          },
        ],
      },
      {
        label: 'Api Security',
        icon: 'pi pi-fw pi-check-circle',
        items: [
          {
            label: 'Api Endpoint',
            // routerLink: ['/asm/module'],
          },
          {
            label: 'Api Access',
            // routerLink: ['/asm/access-group'],
          },
        ],
      },
    ];
  }
}
