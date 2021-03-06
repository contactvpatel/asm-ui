import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessGroupModel } from '@app/data/schema/access-group';
import { Department } from '@app/data/schema/department';
import { CommonService } from '@app/data/services/common.service';
import { AccessGroupApi } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupService {
  url = environment.apiServerUrl;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  // Make all other api call like below method
  getAccessGroup(): Observable<AccessGroupModel[]> {
    return this.http
      .get(this.url + AccessGroupApi.GetAllAccessGroup)
      .pipe(map((res: any) => res.data as AccessGroupModel[]));
  }

  getAccessGroupByApplicationIdAndDepartmentId(
    applicationId: any,
    departmentId: number
  ): Observable<AccessGroupModel[]> {
    return this.http
      .get(
        this.url +
          AccessGroupApi.GetAllAccessGroup +
          '/' +
          applicationId +
          '/' +
          departmentId
      )
      .pipe(map((res: any) => res.data as AccessGroupModel[]));
  }

  getAccessGroupById(id: number): Observable<AccessGroupModel> {
    return this.http
      .get(this.url + AccessGroupApi.GetAllAccessGroup + '/' + id)
      .pipe(map((res: any) => res.data as AccessGroupModel));
  }

  getDepartment(): Observable<Department[]> {
    return this.http
      .get(this.url + 'departments')
      .pipe(map((res: any) => res.data as Department[]));
  }

  deleteAccessGroup(accessGroupId: number): Observable<AccessGroupModel> {
    return this.commonService
      .delete('access-groups/' + accessGroupId + '/0')
      .pipe(map((res: any) => res.data as AccessGroupModel));
  }

  createAccessGroup(accessGroup: any): Observable<AccessGroupModel> {
    return this.commonService
      .post('access-groups', accessGroup)
      .pipe(map((res: any) => res.data as AccessGroupModel));
  }

  updateAccessGroup(accessGroup: any): Observable<AccessGroupModel> {
    return this.commonService
      .put('access-groups', accessGroup)
      .pipe(map((res: any) => res.data as AccessGroupModel));
  }
}
