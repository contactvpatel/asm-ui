import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Application, IsActive, Module,  ModuleType } from '@app/data/schema/module';
import { ModuleService } from '@app/data/services/module.service';
<<<<<<< HEAD
import { applicationService } from '@app/data/services/application.service';
=======
import { Console } from 'console';
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
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
<<<<<<< HEAD
  moduleForm: FormGroup;
=======
  isActive:IsActive[];
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
  constructor(
    private moduleService: ModuleService,
    private applicationService:applicationService,
    private messageService: MessageService,
<<<<<<< HEAD
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {}
=======
    private confirmationService: ConfirmationService
  ) {
    this.application = [
      { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'PBR' }
    ];
  }
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f

  ngOnInit(): void {
    this.getAllModule();
    this.getModuleType();
<<<<<<< HEAD
    this.getApplication();
    this.createForm();
=======
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
    }

  openNew(): void {
    this.module  = {
      name: null,
      code: null,
      isActive: 'true'
    }
<<<<<<< HEAD
    this.selectedparentmodules=null;
=======

>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
    this.selectedModuleType = null;
    this.selectedApplication = null;
    this.selectedmodules = null;
    this.submitted = false;
    this.moduleDialog = true;
    
  }
  createForm() {
    this.moduleForm = this.fb.group({
      applicatioId:[null,[Validators.required]],
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      applicationId: [null, [Validators.required]],
      moduleTypeId: [null, [Validators.required]],
      parentId:[null, [Validators.required]],
      isActive:[null, [Validators.required]],
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
      this.module=data;
      this.module = {
        name: data.name,
        code: data.code,
<<<<<<< HEAD
        moduleId:data.moduleId,
        isActive: data.isActive.toString()
      }
      
=======
        isActive: data.isActive.toString()
      }
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
      this.selectedApplication=data.applicationId;
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
     
<<<<<<< HEAD
    if (this.module.name.trim() && this.module.code.trim() && this.selectedModuleType.moduleTypeId!==null && this.selectedApplication.trim()) {
=======
    if (this.module.name.trim()) {
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
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
<<<<<<< HEAD
        
        this.module.applicationId = this.selectedApplication;
=======
        this.module.applicationId = '3FA85F64-5717-4562-B3FC-2C963F66AFA6';
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
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
          this.module.parentModuleId = this.selectedparentmodules;
        }
<<<<<<< HEAD
        this.module.applicationId = this.selectedApplication;
        
=======
        this.module.applicationId = '3FA85F64-5717-4562-B3FC-2C963F66AFA6';
>>>>>>> 09adda8978309406959e04d0eeb27aab797ef30f
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
  getApplication():void{
    
    this.applicationService
      .getApplication()
      .then((data) => ((this.application = data)));
  }
  getAllModule(): void {
    this.modules = [];
    this.moduleService
      .getModules()
      .then((data) => ((this.modules = data)));
  }
  getModuleType(): void {
    this.moduleService.getModuleType().then((data) => (this.moduleType = data));
  }
}
