import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  Application,
  IsActive,
  Module,
  ModuleType
} from '@app/data/schema/module';
import { ModuleService } from '@app/data/services/module.service';
import { applicationService } from '@app/data/services/application.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  moduleDialog: boolean;
  modules: Module[];
  moduleType: ModuleType[];
  module: Module;
  selectedmodules: Module[];
  selectedparentmodules: number;
  submitted: boolean;
  selectedApplication: string;
  application: Application[];
  selectedModuleType: ModuleType;
  moduleForm: FormGroup;
  parentModule: Module[];
  constructor(
    private moduleService: ModuleService,
    private applicationService: applicationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllModule();
    this.getModuleType();
    this.getApplication();
    this.createForm();
  }

  openNew(): void {
    this.module = {
      name: null,
      code: null,
      isActive: 'true'
    };
    this.selectedparentmodules = null;
    this.selectedModuleType = null;
    this.selectedApplication = null;
    this.selectedmodules = null;
    this.submitted = false;
    this.moduleDialog = true;
  }
  createForm() {
    this.moduleForm = this.fb.group({
      applicatioId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      applicationId: [null, [Validators.required]],
      moduleTypeId: [null, [Validators.required]],
      parentId: [null, [Validators.required]],
      isActive: [null, [Validators.required]]
    });
  }
  deleteSelectedmodules(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected modules?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.modules = this.modules.filter(
        //   (val) => !this.selectedmodules.includes(val)
        // );
        this.selectedmodules.forEach((module) => {
          this.moduleService
            .deleteModule(module.moduleId)
            .subscribe((data) => this.getAllModule());
        });
        this.selectedmodules = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'modules Deleted',
          life: 3000
        });
      }
    });
  }

  editModule(module: Module): void {
    this.moduleService.getModuleById(module.moduleId).subscribe((data) => {
      this.module = data;
      this.module = {
        name: data.name,
        code: data.code,
        moduleId: data.moduleId,
        isActive: data.isActive.toString()
      };
      this.parentModule = null;
      this.moduleService
        .getModulesByApplicationId(data.applicationId)
        .subscribe((data) => (this.parentModule = data));
      this.selectedApplication = data.applicationId;
      this.selectedModuleType = data.moduleType;
      this.selectedparentmodules = data.parentModuleId;
    });
    this.moduleDialog = true;
  }

  deleteModule(module: Module): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + module.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.moduleService
          .deleteModule(module.moduleId)
          .subscribe((data) => this.getAllModule());

        this.module = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Module Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog(): void {
    this.moduleDialog = false;
    this.submitted = false;
  }

  saveModule(): void {
    this.submitted = true;

    if (
      this.module.name.trim() &&
      this.module.code.trim() &&
      this.selectedModuleType.moduleTypeId !== null &&
      this.selectedApplication.trim()
    ) {
      if (this.module.moduleId) {
        this.module.parentModule = null;
        this.module.moduleType = null;
        this.module.moduleTypeId = 0;
        this.module.parentModuleId = 0;
        this.module.moduleTypeId = this.selectedModuleType.moduleTypeId;
        if (
          this.selectedparentmodules !== undefined &&
          this.selectedparentmodules !== null
        ) {
          this.module.parentModuleId = this.selectedparentmodules;
        }

        this.module.applicationId = this.selectedApplication;
        this.moduleService
          .updateModule(this.module)
          .subscribe((data) => this.getAllModule(), (this.module = null));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Module Updated',
          life: 3000
        });
      } else {
        this.module.moduleTypeId = this.selectedModuleType.moduleTypeId;
        if (this.selectedparentmodules !== undefined) {
          this.module.parentModuleId = this.selectedparentmodules;
        }
        this.module.applicationId = this.selectedApplication;

        this.moduleService
          .createModule(this.module)
          .subscribe((data) => this.getAllModule());

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Module Created',
          life: 3000
        });
      }

      this.modules = [...this.modules];
      this.moduleDialog = false;
      this.module = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].name === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  ParentModule(): void {
    this.parentModule = null;
    this.moduleService
      .getModulesByApplicationId(this.selectedApplication)
      .subscribe((data) => (this.parentModule = data));
  }
  getApplication(): void {
    this.applicationService
      .getApplication()
      .subscribe((data) => (this.application = data));
  }
  getAllModule(): void {
    this.modules = [];
    this.moduleService.getModules().subscribe((data) => (this.modules = data));
  }
  getModuleType(): void {
    this.moduleService
      .getModuleType()
      .subscribe((data) => (this.moduleType = data));
  }
}
