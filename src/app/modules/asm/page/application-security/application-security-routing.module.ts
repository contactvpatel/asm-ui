import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'access-group',
    loadChildren: () =>
      import('../application-security/access-group/access-group.module').then(
        (m) => m.AccessGroupModule
      )
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationSecurityRoutingModule {}
