import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsmService {
  pageLoader: boolean;

  pageLoaderChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.pageLoaderChange.next(false);
  }

  showLoader() {
    this.pageLoaderChange.next(true);
  }
  hideLoader() {
    this.pageLoaderChange.next(false);
    //this.pageLoader = false;
  }
}
