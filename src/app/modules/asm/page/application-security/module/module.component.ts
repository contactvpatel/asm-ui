import { Component, OnInit } from '@angular/core';
import { Application, Module,  ModuleType } from '@app/data/schema/module';
import { ModuleService } from '@app/data/services/module.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

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
  selectedApplication: Application;
  application: Application[];
  selectedModuleType: ModuleType;
  isActive: false;

  constructor(
    private moduleService: ModuleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.application = [
      { id: 'A23B4841-10BF-4DE0-AD84-25E7ADF7EA7A', name: 'PBR' }
    ];
  }

  ngOnInit(): void {
    this.getAllModule();
    this.getModuleType();
  }

  openNew(): void {
    this.module = {};
    this.selectedModuleType = null;
    this.selectedApplication = null;
    this.selectedmodules = null;
    this.submitted = false;
    this.moduleDialog = true;
  }

  deleteSelectedmodules(): void {
    console.log(this.modules);
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
            .then((data) => this.getAllModule());
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
    this.moduleService.getModuleById(module.moduleId).then((data) => {
      this.module = data;
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
          .then((data) => this.getAllModule());

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

    if (this.module.name.trim()) {
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
        //  this.module.parentModuleId = this.selectedparentmodules.moduleId;
        }
        this.module.applicationId = 'a23b4841-10bf-4de0-ad84-25e7adf7ea7a';
        this.moduleService
          .updateModule(this.module)
          .then((data) => this.getAllModule(), (this.module = null));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Module Updated',
          life: 3000
        });
      } else {
        this.module.moduleTypeId = this.selectedModuleType.moduleTypeId;
        if (this.selectedparentmodules !== undefined) {
        //  this.module.parentModuleId = this.selectedparentmodules.moduleId;
        }
        this.module.applicationId = 'a23b4841-10bf-4de0-ad84-25e7adf7ea7a';
        this.moduleService
          .createModule(this.module)
          .then((data) => this.getAllModule());

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
  getAllModule(): void {
    this.modules = [];
    this.moduleService
      .getModules()
      .then((data) => ((this.modules = data), console.log(this.modules)));
  }
  getModuleType(): void {
    this.moduleService.getModuleType().then((data) => (this.moduleType = data));
  }
}
