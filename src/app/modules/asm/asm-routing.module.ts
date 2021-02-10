import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shared/shell/shell.service';
import { AsmComponent } from './asm.component';
import { ModuleComponent } from './page/application-security/module/module.component';
import { AccessGroupSummaryComponent } from './page/application-security/access-group/access-group-summary/access-group-summary.component';
import { AccessGroupDetailComponent } from './page/application-security/access-group/access-group-detail/access-group-detail.component';
import { AccessGroupAssignmentComponent } from './page/application-security/access-group-assignment/access-group-assignment.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      component: AsmComponent,

      children: [
        {
          path: 'home',
          component: HomeComponent,
        },
        {
          path: 'module',
          component: ModuleComponent,
        },
        {
          path: 'access-group',
          component: AccessGroupSummaryComponent,
        },
        {
          path: 'access-group/:id',
          component: AccessGroupDetailComponent,
        },
        {
          path: 'access-group-assignment',
          component: AccessGroupAssignmentComponent,
        },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsmRoutingModule {}
