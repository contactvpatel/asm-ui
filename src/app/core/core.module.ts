import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { HttpService } from '@app/core/services/http.service';
import { RouteReusableStrategy } from './route-reusable-strategy';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
