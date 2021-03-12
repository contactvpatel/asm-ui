import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { SessionTimeoutComponent } from './modules/page/session-timeout/session-timeout.component';
import { NoAccessComponent } from './modules/page/no-access/no-access.component';
import { PageNotFoundComponent } from './modules/page/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ShellModule } from './shared/shell/shell.module';
import { MessageService } from 'primeng/api';
import { AsmAuthComponent } from './modules/page/asm-auth/asm-auth.component';
import { AsmModule } from './modules/asm/asm.module';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  hasProgressBar: false,
  overlayColor: 'rgba(0, 0, 0, 0.5)'
};

@NgModule({
  declarations: [
    AppComponent,
    SessionTimeoutComponent,
    NoAccessComponent,
    PageNotFoundComponent,
    AsmAuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ShellModule,
    ToastModule,
    AsmModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
