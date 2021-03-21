import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shared/shell/shell.service';
import { AsmComponent } from './asm.component';
import { AccessAssignmentGroupDetailComponent } from './page/application-security/access-group-assignment/access-group-assignment-detail/access-group-assignment-detail.component';
import { AccessGroupAssignmentSummaryComponent } from './page/application-security/access-group-assignment/access-group-assignment-summary/access-group-assignment-summary.component';
import { ModuleComponent } from './page/application-security/module/module.component';
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
          path: 'application-security/module',
          component: ModuleComponent
        },
        {
          path: 'application-security/access-group-assignment',
          component: AccessGroupAssignmentSummaryComponent
        },
        {
          path: 'application-security/access-group-assignment/:id',
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
