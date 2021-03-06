import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  pageLoader = false;
  isConfirmModalShown = false;
  deleteDataArr: Array<any> = [];

  constructor(private http: HttpClient) {}

  public get(url: any) {
    return this.http.get(environment.apiServerUrl + url);
  }

  public post(url: any, data: any) {
    return this.http.post(environment.apiServerUrl + url, data);
  }

  public put(url: any, data: any) {
    return this.http.put(environment.apiServerUrl + url, data);
  }

  public delete(url: any) {
    return this.http.delete(environment.apiServerUrl + url);
  }

  public get_observe(url: any, param: HttpParams = null): Observable<any> {
    return this.http.get(environment.apiServerUrl + url, {
      observe: 'response',
      params: param
    });
  }

  public post_observe(url: any, data: any): Observable<any> {
    return this.http.post(environment.apiServerUrl + url, data, {
      observe: 'response'
    });
  }

  public showLoader() {
    this.pageLoader = true;
  }

  public hideLoader() {
    this.pageLoader = false;
  }
}
