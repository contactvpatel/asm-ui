import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleApi ,AccessGroupAssignmentApi, PositionApi} from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';

import { Role,Position } from '../schema/access-group-assgnment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupAssignmentService {
  url = environment.serverUrl;
constructor(private http: HttpClient,private commonService:CommonService) { }
getRoleByDepartmentId(departmentId:number) {
  return this.http
      .get<any>(this.url+RoleApi.GetRoleByDepartment+departmentId)
      .toPromise()
      .then((res) => <Role[]>res.data)
      .then((data) => {
        return data;
      });
}
getAccessGroupAssignment() {
  return this.http
      .get<any>(this.url+AccessGroupAssignmentApi.GetAccessGroupAssignment)
      .toPromise()
      .then((res) => <Role[]>res.data)
      .then((data) => {
        return data;
      });
}
createAccessGroupAssignment(accessGroup:any) {
      return this.commonService
      .post(AccessGroupAssignmentApi.CreateAccessGroupAssignment,accessGroup)
      .toPromise()      
      .then((data) => {
        return data;
      });
}
getAllRole() {
  return this.http
      .get<any>(this.url+RoleApi.GetRole)
      .toPromise()
      .then((res) => <Role[]>res.data)
      .then((data) => {
        return data;
      });
}
getPositionByRoleId(roleId:number) {
  return this.http
      .get<any>(this.url+PositionApi.GetPosition+roleId)
      .toPromise()
      .then((res) => <Position[]>res.data)
      .then((data) => {
        return data;
      });
}
}
