import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessGroupAPI } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessGroupModel, Department } from '../schema/access-group';

import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  url = environment.serverUrl;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  // Make all other api call like below method
  getAccessGroup(): Observable<AccessGroupModel[]> {
    return this.http
      .get(this.url + AccessGroupAPI.GetAllAccessGroup)
      .pipe(map((res: any) => res.data as AccessGroupModel[]));
  }

  getAccessGroupByApplicationIdAndDepartmentId(
    applicatioId: any,
    departmentId: number
  ) {
    return this.http
      .get<any>(
        'https://localhost:44388/api/v1.0/access-groups/' +
          applicatioId +
          '/' +
          departmentId
      )
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }
  getAccessGroupById(id: number) {
    return this.http
      .get<any>(this.url + AccessGroupAPI.GetAllAccessGroup + '/' + id)
      .toPromise()
      .then((res) => <AccessGroupModel>res.data)
      .then((data) => {
        return data;
      });
  }
  getDepartment() {
    return this.http
      .get<any>(this.url + 'departments')
      .toPromise()
      .then((res) => <Department[]>res.data)
      .then((data) => {
        return data;
      });
  }
  deleteAccessGroup(accessGroupId: number) {
    return this.commonService
      .delete('access-groups/' + accessGroupId + '/0')
      .toPromise()
      .then((data) => {
        return data;
      });
  }
  createAccessGroup(accessGroup: any) {
    return this.commonService
      .post('access-groups', accessGroup)
      .toPromise()
      .then((data) => {
        return data;
      });
  }
  updateAccessGroup(accessGroup: any) {
    return this.commonService
      .put('access-groups', accessGroup)
      .toPromise()
      .then((data) => {
        return data;
      });
  }
  getProductsSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProducts() {
    return this.http
      .get<any>('assets/products.json')
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/products-orders-small.json')
      .toPromise()
      .then((res) => <AccessGroupModel[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
