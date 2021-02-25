import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsmRoutingModule } from './asm-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/Menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';

import { HeaderComponent } from '@app/layout/header/header.component';
import { FooterComponent } from '@app/layout/footer/footer.component';

import { AsmComponent } from './asm.component';
import { HomeComponent } from './page/home/home.component';
import { ModuleComponent } from './page/application-security/module/module.component';
import { AccessGroupSummaryComponent } from './page/application-security/access-group/access-group-summary/access-group-summary.component';
import { AccessGroupDetailComponent } from './page/application-security/access-group/access-group-detail/access-group-detail.component';
import { AccessGroupAssignmentSummaryComponent } from './page/application-security/access-group-assignment/access-group-assignment-summary/access-group-assignment-summary.component';
import { AccessAssignmentGroupDetailComponent } from './page/application-security/access-group-assignment/access-group-assignment-detail/access-group-assignment-detail.component';
import { ConfirmationService } from 'primeng/api';
import { ModuleService } from '@app/data/services/module.service';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';

import { EncryptPipeModule } from '../encrypt/encrypt.pipe.module';

import { AsmService } from './asm.service';
import { ApplicationSecurityModule } from './page/application-security/application-security.module';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

export const LoaderConfiguration: NgxUiLoaderConfig = {
  fgsColor: '#e64a19',
  pbThickness: 3,
  hasProgressBar: true,
  pbColor: '#e64a19'
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsmComponent,
    HomeComponent,
    ModuleComponent,
    AccessGroupSummaryComponent,
    AccessGroupDetailComponent,
    AccessAssignmentGroupDetailComponent,
    AccessGroupAssignmentSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    AccordionModule,
    MenubarModule,
    ButtonModule,
    SidebarModule,
    PanelMenuModule,
    TableModule,
    ToastModule,
    CardModule,
    StepsModule,
    InputTextModule,
    ContextMenuModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    InputNumberModule,
    KeyFilterModule,
    MultiSelectModule,
    RadioButtonModule,
    ToolbarModule,
    CheckboxModule,
    DialogModule,
    ConfirmDialogModule,
    PickListModule,
    MenuModule,
    RatingModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    SliderModule,
    AsmRoutingModule,
    EncryptPipeModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ConfirmationService,
    AsmService,
    ModuleService,
    AccessGroupService,
    AccessGroupAssignmentService
  ]
})
export class AsmModule {}
