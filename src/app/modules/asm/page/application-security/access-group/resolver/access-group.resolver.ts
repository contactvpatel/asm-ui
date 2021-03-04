// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// import { ModuleService } from '@app/data/services/module.service';
// import { AccessGroup } from '@app/data/schema/module';

// @Injectable({
//   providedIn: 'root',
// })
// export class AccessGroupEditResolver implements Resolve<AccessGroup> {
//   constructor(private accessGroupService: ModuleService) {}
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const id = Number(route.params.id);

//     return this.accessGroupService.getModules()(
//       map((response: any) => {
//         const accounts = new AccessGroup();
//         let acc = [];
//         try {
//           acc = response.data;          
//         } catch (error) {
//           console.log(error);
//         }

//         return {
//           response: acc.find((x) => x.id === id),
//           data: route.data,
//           param: route.params,
//         };
//       }),
//       catchError((error) => {
//         return of(error);
//       })
//     );
//   }
// }
