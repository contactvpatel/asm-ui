import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGroupDetailComponent } from './access-group-detail/access-group-detail.component';
import { AccessGroupSummaryComponent } from './access-group-summary/access-group-summary.component';

const routes: Routes = [
  {
    path: '',
    component: AccessGroupSummaryComponent
  },
  {
    path: 'edit/:id',
    component: AccessGroupDetailComponent
  },
  {
    path: 'create',
    component: AccessGroupDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessGroupRoutingModule {}
