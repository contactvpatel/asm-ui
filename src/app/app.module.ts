import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuService } from './layout/app.menu.service';
import { LayoutModule } from './layout/layout.module';
import { AsmModule } from './modules/asm/asm.module';
import { AsmAuthComponent } from './modules/page/asm-auth/asm-auth.component';
import { NoAccessComponent } from './modules/page/no-access/no-access.component';
import { PageNotFoundComponent } from './modules/page/page-not-found/page-not-found.component';
import { SessionTimeoutComponent } from './modules/page/session-timeout/session-timeout.component';
import { ShellModule } from './shared/shell/shell.module';

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
    LayoutModule,
    ShellModule,
    ToastModule,
    AsmModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    AppRoutingModule
  ],
  providers: [MessageService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule {}
