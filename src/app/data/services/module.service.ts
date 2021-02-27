import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {  Module,   ModuleType } from '../schema/module';
import { ModuleAPI  } from '../../shared/constants/api.constant';
import {CommonService}from '../services/common.service'
import {Observable}from 'rxjs'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  url = environment.serverUrl;

  constructor(private http: HttpClient,private commonService:CommonService) {}

  
  getModules():Observable<Module[]> {
    return this.http
      .get<any>(this.url+ ModuleAPI.GetAllModule)
      .pipe(map((res: any) => res.data as Module[]));

  }
  getModulesByApplicationId(applicationId:any):Observable<Module[]> {
    return this.http
      .get<any>(this.url+ ModuleAPI.GetModuleByApplication+applicationId)
      .pipe(map((res: any) => res.data as Module[]));
  }
  getModuleType():Observable<ModuleType[]> {
    return this.http
      .get<any>('https://localhost:44388/api/v1.0/module-types')
      .pipe(map((res: any) => res.data as ModuleType[]));
  }
  getModuleById(module:any):Observable<Module>
  {
    return this.http
    .get<any>(this.url+ ModuleAPI.GetModuleById+module)
    .pipe(map((res: any) => res.data as Module));
  }
  createModule(module:any):Observable<Module> {
    console.log(module)
    return this.commonService
      .post('modules',module)
      .pipe(map((res: any) => res.data as Module));
  }
  updateModule(module:any):Observable<Module>
  {
    return this.http
    .put<any>(this.url+ ModuleAPI.UpdateModule,module)
    .pipe(map((res: any) => res.data as Module));
  }
  deleteModule(module:any):Observable<Module> {
    console.log(module)
    return this.commonService
      .delete('modules/'+module+"/"+0)
      .pipe(map((res: any) => res.data as Module));
  }
  
}
