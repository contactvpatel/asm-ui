import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shared/shell/shell.service';
import { AsmComponent } from './asm.component';
import { ModuleComponent } from './page/application-security/module/module.component';
import { AccessGroupSummaryComponent } from './page/application-security/access-group/access-group-summary/access-group-summary.component';
import { AccessGroupDetailComponent } from './page/application-security/access-group/access-group-detail/access-group-detail.component';
import { AccessAssignmentGroupDetailComponent } from './page/application-security/access-group-assignment/access-group-assignment-detail/access-group-assignment-detail.component';
import { AccessGroupAssignmentSummaryComponent } from './page/application-security/access-group-assignment/access-group-assignment-summary/access-group-assignment-summary.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      component: AsmComponent,

      children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'application-security',
          loadChildren: () =>
            import(
              './page/application-security/application-security.module'
            ).then((m) => m.ApplicationSecurityModule)
        },
        {
          path: 'module',
          component: ModuleComponent
        },
        {
          path: 'access-group-assignment',
          component: AccessGroupAssignmentSummaryComponent
        },
        {
          path: 'access-group-assignment/:id',
          component: AccessAssignmentGroupDetailComponent
        }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsmRoutingModule {}
