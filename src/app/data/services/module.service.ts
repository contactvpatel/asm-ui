import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Module } from '@app/data/schema/module';
import { ModuleType } from '@app/data/schema/module-type';
import { CommonService } from '@app/data/services/common.service';
import { ModuleApi } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  url = environment.apiServerUrl;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getModules(): Observable<Module[]> {
    return this.http
      .get<any>(this.url + ModuleApi.GetAllModule)
      .pipe(map((res: any) => res.data as Module[]));
  }

  getModulesByApplicationId(applicationId: any): Observable<Module[]> {
    return this.http
      .get<any>(this.url + ModuleApi.GetModuleByApplication + applicationId)
      .pipe(map((res: any) => res.data as Module[]));
  }

  getModuleType(): Observable<ModuleType[]> {
    return this.http
      .get<any>(this.url + 'module-types')
      .pipe(map((res: any) => res.data as ModuleType[]));
  }

  getModuleById(module: any): Observable<Module> {
    return this.http
      .get<any>(this.url + ModuleApi.GetModuleById + module)
      .pipe(map((res: any) => res.data as Module));
  }

  createModule(module: any): Observable<Module> {
    return this.commonService
      .post('modules', module)
      .pipe(map((res: any) => res.data as Module));
  }

  updateModule(module: any): Observable<Module> {
    return this.http
      .put<any>(this.url + ModuleApi.UpdateModule, module)
      .pipe(map((res: any) => res.data as Module));
  }

  deleteModule(module: any): Observable<Module> {
    return this.commonService
      .delete('modules/' + module + '/' + 0)
      .pipe(map((res: any) => res.data as Module));
  }
}
