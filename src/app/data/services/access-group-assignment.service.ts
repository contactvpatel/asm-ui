import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccessGroupAssignmentApi,
  PositionApi, RoleApi
} from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessGroupModel } from '../schema/access-group';
import { Position, Role } from '../schema/access-group-assignment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupAssignmentService {
  url = environment.apiServerUrl;
  constructor(private http: HttpClient, private commonService: CommonService) {}

  getRoleByDepartmentId(departmentId: number): Observable<Role[]> {
    return this.http
      .get<any>(this.url + RoleApi.GetRoleByDepartment + departmentId)
      .pipe(map((res: any) => res.data as Role[]));
  }

  getAccessGroupAssignment(): Observable<AccessGroupModel[]> {
    return this.http
      .get<any>(this.url + AccessGroupAssignmentApi.GetAccessGroupAssignment)
      .pipe(map((res: any) => res.data as AccessGroupModel[]));
  }

  deleteAccessGroupAssignment(
    accessGroupAssignmentId: number
  ): Observable<AccessGroupModel[]> {
    return this.commonService
      .delete(
        AccessGroupAssignmentApi.DeleteAccessGroupAssignment +
          accessGroupAssignmentId +
          '/' +
          0
      )
      .pipe(map((res: any) => res.data as AccessGroupModel[]));
  }

  createAccessGroupAssignment(accessGroup: any): Observable<AccessGroupModel> {
    return this.commonService
      .post(AccessGroupAssignmentApi.CreateAccessGroupAssignment, accessGroup)
      .pipe(map((res: any) => res.data as AccessGroupModel));
  }

  getAllRole(): Observable<Role[]> {
    return this.http
      .get<any>(this.url + RoleApi.GetRole)
      .pipe(map((res: any) => res.data as Role[]));
  }

  getPositionByRoleId(roleId: number): Observable<Position[]> {
    return this.http
      .get<any>(this.url + PositionApi.GetPosition + roleId)
      .pipe(map((res: any) => res.data as Position[]));
  }
}
