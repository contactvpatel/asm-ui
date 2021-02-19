import { IfStmt, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import {
  Application,
  Module,
  moduleType,
  parentModule
} from '@app/data/schema/product';
import { ModuleService } from '@app/data/services/module.service';
import { Console } from 'console';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  productDialog: boolean;

  modules: Module[];
  moduleType: moduleType[];
  product: Module;
  selectedmodules: Module[];
  selectedparentmodules: Module;
  submitted: boolean;
  selectedApplication: Application;
  application: Application[];
  selectedModuleType: moduleType;
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
    this.product = {};
    this.selectedModuleType = null;
    this.selectedApplication = null;
    this.selectedmodules = null;
    this.submitted = false;
    this.productDialog = true;
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

  editProduct(product: Module): void {
    //  this.product = { ...product };
    //  this.selectedModuleType=this.product.moduleType;
    this.moduleService
      .getModuleById(product.moduleId)
      .then(
        (data) => (
          (this.product = data), (this.selectedModuleType = data.moduleType)
        )
      );
    this.productDialog = true;
  }

  deleteProduct(product: Module): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.modules = this.modules.filter((val) => val.moduleId !== product.moduleId);
        this.moduleService
          .deleteModule(product.moduleId)
          .then((data) => this.getAllModule());

        this.product = {};
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
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(): void {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.moduleId) {
        this.product.parentModule = null;
        this.product.moduleType = null;
        this.product.moduleTypeId = 0;
        this.product.parentModuleId = 0;
        // this.moduleService.getModuleType().then((data) => (this.moduleType = data));
        // this.modules[this.findIndexById(this.product.name)] = this.product;
        this.product.moduleTypeId = this.selectedModuleType.moduleTypeId;
        if (
          this.selectedparentmodules !== undefined &&
          this.selectedparentmodules !== null
        ) {
          this.product.parentModuleId = this.selectedparentmodules.moduleId;
        }
        this.product.applicationId = 'a23b4841-10bf-4de0-ad84-25e7adf7ea7a';
        this.moduleService
          .updateModule(this.product)
          .then((data) => this.getAllModule(), (this.product = null));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000
        });
      } else {
        this.product.moduleTypeId = this.selectedModuleType.moduleTypeId;
        if (this.selectedparentmodules !== undefined) {
          this.product.parentModuleId = this.selectedparentmodules.moduleId;
        }
        this.product.applicationId = 'a23b4841-10bf-4de0-ad84-25e7adf7ea7a';
        this.moduleService
          .createModule(this.product)
          .then((data) => this.getAllModule());

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000
        });
      }

      this.modules = [...this.modules];
      this.productDialog = false;
      this.product = {};
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
  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
