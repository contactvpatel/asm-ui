import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from './core/guards/permission.guard';
import { AppMainComponent } from './layout/app.main.component';
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
    path: 'signed-out',
    component: SessionTimeoutComponent
  },
  {
    path: '403',
    component: SessionTimeoutComponent
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
    path: ':auth',
    pathMatch: 'full',
    component: AsmAuthComponent
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
