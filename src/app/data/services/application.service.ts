import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationApi } from '../../shared/constants/api.constant';
import { Application } from '../schema/module';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  url = environment.apiServerUrl;
  constructor(private http: HttpClient, private commonService: CommonService) {}

  getApplication(): Observable<Application[]> {
    return this.http
      .get<any>(this.url + ApplicationApi.GetApplication)
      .pipe(map((res: any) => res.data as Application[]));
  }
}
