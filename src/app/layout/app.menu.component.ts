import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  template: `
    <ul class="layout-menu">
      <li
        app-menuitem
        *ngFor="let item of model; let i = index"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
    </ul>
  `
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[];

  constructor(public app: AppComponent) {}

  ngOnInit() {
    this.model = [
      {
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/asm/home']
          }
        ]
      },
      {
        label: 'Application Security',
        icon: 'pi pi-fw pi-unlock',
        items: [
          {
            label: 'Module',
            icon: 'pi pi-fw pi-microsoft',
            routerLink: ['/asm/application-security/module']
          },
          {
            label: 'Access Group',
            icon: 'pi pi-fw pi-key',
            routerLink: ['/asm/application-security/access-group']
          },
          {
            label: 'Access Group Assignment',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/asm/application-security/access-group-assignment']
          }
        ]
      },
      /*{
        label: 'Api Security',
        icon: 'pi pi-fw pi-check-circle',
        items: [
          {
            label: 'Api Endpoint'
            routerLink: ['/asm/api-endpoint'],
          },
          {
            label: 'Api Access'
            routerLink: ['/asm/api-access'],
          }
        ]
      }*/
    ];
  }
}
