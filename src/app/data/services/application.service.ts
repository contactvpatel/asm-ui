import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '@app/data/schema/application';
import { CommonService } from '@app/data/services/common.service';
import { ApplicationApi } from '@app/shared/constants/api.constant';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
