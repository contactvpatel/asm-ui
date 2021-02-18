import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleApi } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { Role } from '../schema/access-group-assgnment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupAssignmentService {
  url = environment.serverUrl;
constructor(private http: HttpClient,private commonService:CommonService) { }
getRoleByDepartmentId(departmentId:number) {
  return this.http
      .get<any>(this.url+RoleApi.GetRole+departmentId)
      .toPromise()
      .then((res) => <Role[]>res.data)
      .then((data) => {
        return data;
      });
}
}
