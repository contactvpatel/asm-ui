import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { ModuleService } from '@app/data/services/module.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/Menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { EncryptPipeModule } from '../encrypt/encrypt.pipe.module';
import { AsmRoutingModule } from './asm-routing.module';
import { AsmComponent } from './asm.component';
import { AsmService } from './asm.service';
import { RequiredFiledComponent } from './requiredfiled.component';
import { AccessAssignmentGroupDetailComponent } from './page/application-security/access-group-assignment/access-group-assignment-detail/access-group-assignment-detail.component';
import { AccessGroupAssignmentSummaryComponent } from './page/application-security/access-group-assignment/access-group-assignment-summary/access-group-assignment-summary.component';
import { AccessGroupDetailComponent } from './page/application-security/access-group/access-group-detail/access-group-detail.component';
import { AccessGroupSummaryComponent } from './page/application-security/access-group/access-group-summary/access-group-summary.component';
import { ModuleComponent } from './page/application-security/module/module.component';
import { HomeComponent } from './page/home/home.component';

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
    AsmComponent,
    HomeComponent,
    ModuleComponent,
    AccessGroupSummaryComponent,
    AccessGroupDetailComponent,
    AccessAssignmentGroupDetailComponent,
    AccessGroupAssignmentSummaryComponent,
    RequiredFiledComponent
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
