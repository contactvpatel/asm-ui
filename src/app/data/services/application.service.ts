import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {  Application} from '../schema/module';
import { ApplicationApi  } from '../../shared/constants/api.constant';
import {CommonService}from '../services/common.service'
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
  })
  export class applicationService{
    url = environment.serverUrl;
    constructor(private http: HttpClient,private commonService:CommonService) {}
    getApplication():Observable<Application[]> {
        return this.http
          .get<any>(this.url+ApplicationApi.GetApplication)
          .pipe(map((res: any) => res.data as Application[]));
      }
  }  