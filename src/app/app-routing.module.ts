import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@app/core/guards/permission.guard';
import { AppMainComponent } from '@app/layout/app.main.component';
import { AsmAuthComponent } from './modules/page/asm-auth/asm-auth.component';
import { NoAccessComponent } from './modules/page/no-access/no-access.component';
import { PageNotFoundComponent } from './modules/page/page-not-found/page-not-found.component';
import { SessionTimeoutComponent } from './modules/page/session-timeout/session-timeout.component';

const routes: Routes = [
  {
    path: '401',
    component: NoAccessComponent
  },
  {
    path: 'signedout',
    component: SessionTimeoutComponent
  },
  {
    path: '403',
    component: SessionTimeoutComponent
  },
  {
    path: 'authentication',
    component: AsmAuthComponent
  },
  {
    path: '',
    component: AppMainComponent,
    children: [
      {
        path: 'asm',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./modules/asm/asm.module').then((m) => m.AsmModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
