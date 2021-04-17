import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { AccessGroup, AccessGroupModel } from '@app/data/schema/access-group';
import { Application } from '@app/data/schema/application';
import { Department } from '@app/data/schema/department';
import { Module } from '@app/data/schema/module';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { ApplicationService } from '@app/data/services/application.service';
import { ModuleService } from '@app/data/services/module.service';
import { AppBreadcrumbService } from '@app/layout/app.breadcrumb.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access-group-detail',
  templateUrl: './access-group-detail.component.html',
  styleUrls: ['./access-group-detail.component.scss'],
  providers: [ConfirmationService]
})
export class AccessGroupDetailComponent implements OnInit, OnDestroy {
  accessGroup: AccessGroup;
  module: Module[];
  accessGroupModel: AccessGroupModel;
  subscription: Subscription;
  application: Application[];
  department: Department[];
  accessGroups: AccessGroup[];
  submitted = false;
  accessgroupForm: FormGroup;

  readonly config = {
    mode: {
      isEdit: false,
      moduleExists: false
    },
    // temp logic CheckBox
    header: {
      checkBox: {
        hasViewAccess: false,
        hasCreateAccess: false,
        hasUpdateAccess: false,
        hasDeleteAccess: false,
        hasAccessRight: false
      },
      radio: {
        active: 'false'
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private applicationService: ApplicationService,
    private accessGroupService: AccessGroupService,
    private breadcrumbService: AppBreadcrumbService,
    private credentialsService: CredentialsService
  ) {
    this.breadcrumbService.setItems([
      {
        label: 'Access Group',
        routerLink: ['/application-security/access-group']
      },
      { label: 'Detail' }
    ]);
  }

  ngOnInit(): void {
    this.accessGroup = {} as AccessGroup;
    this.createForm();
    this.departmentList();
    this.subscribeActivatedRoute();
    this.GetApplication();
  }

  // Route Check IsEditMode True OR False
  private subscribeActivatedRoute(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const accessGroupId = params.get('id');
      if (accessGroupId) {
        this.GetAccessGroupById(+accessGroupId);
        this.config.mode.isEdit = true;
        this.config.mode.moduleExists = true;
      } else {
        this.config.mode.isEdit = false;
        this.accessGroup = {} as AccessGroup;
      }
    });
  }

  // Create ReactiveForm
  createForm() {
    this.accessgroupForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      applicationId: [null, [Validators.required]],
      departmentId: [null],
      isActive: ['true']
    });
  }

  // Get ApplicationList
  GetApplication() {
    this.applicationService
      .getApplication()
      .subscribe((data) => (this.application = data));
  }

  // Get Module By ApllicationId { Application Dropdown (onChange) Event }
  getAllModule() {
    if (this.accessgroupForm.value?.applicationId === null) {
      this.config.mode.moduleExists = false;
      this.config.mode.moduleExists = false;
      this.config.header.checkBox.hasViewAccess = false;
      this.config.header.checkBox.hasUpdateAccess = false;
      this.config.header.checkBox.hasDeleteAccess = false;
      this.config.header.checkBox.hasCreateAccess = false;
      this.accessGroups = [];
    } else {
      this.config.mode.moduleExists = true;
      this.moduleService
        .getModulesByApplicationId(this.accessgroupForm.value?.applicationId)
        .subscribe((data) => {
          this.accessGroups = new AccessGroup().fromJson(data);
        });
    }
  }

  // Get DepartmentList
  departmentList() {
    this.accessGroupService
      .getDepartment()
      .subscribe((data) => (this.department = data));
  }

  // Get AccessGroupById { EditMode }
  GetAccessGroupById(id: number) {
    this.accessGroupService.getAccessGroupById(id).subscribe((data) => {
      this.accessGroupModel = data;
      this.setEditFormData();
      this.moduleService
        .getModulesByApplicationId(this.accessGroupModel.applicationId)
        .subscribe((data) => {
          (this.module = data), this.setmodule();
        });
    });
  }

  // Set AccessGroup in  ReactiveForm Data { EditMode }
  private setEditFormData() {
    this.accessgroupForm.setValue({
      name: this.accessGroupModel.name,
      description: this.accessGroupModel.description,
      applicationId: this.accessGroupModel.applicationId,
      departmentId: this.accessGroupModel.departmentId,
      isActive: this.accessGroupModel.isActive.toString()
    });
  }

  // Set ModuleTable
  setmodule() {
    let accessGroup = [];

    accessGroup = this.setEditAccessGroup(
      this.module,
      this.accessGroupModel.accessGroupModulePermissions,
      accessGroup
    );
    this.accessGroups = new AccessGroup().fromJson(accessGroup, true);
  }

  // Set Edit AccessGroup
  setEditAccessGroup(
    modules: Module[],
    accessGroup: any,
    flatDataItems: any[]
  ) {
    modules.forEach((item) => {
      const permissionFound = accessGroup.find(
        (a) => a.moduleId == item.moduleId
      );
      if (permissionFound) {
        flatDataItems.push({
          moduleId: item.moduleId,
          name: item.name,
          moduleType: {
            name: item.moduleType.name,
            isControlType: item.moduleType.isControlType
          },
          parentModule: {
            name: item.parentModule === null ? '' : item.parentModule.name
          },
          accessGroupModulePermissions: {
            moduleId: permissionFound.moduleId,
            hasViewAccess: permissionFound.hasViewAccess,
            hasCreateAccess: permissionFound.hasCreateAccess,
            hasUpdateAccess: permissionFound.hasUpdateAccess,
            hasDeleteAccess: permissionFound.hasDeleteAccess,
            hasAccessRight: permissionFound.hasAccessRight
          }
        });
      } else {
        flatDataItems.push({
          moduleId: item.moduleId,
          name: item.name,
          moduleType: {
            name: item.moduleType.name,
            isControlType: item.moduleType.isControlType
          },
          parentModule: {
            name: item.parentModule === null ? '' : item.parentModule.name
          },
          accessGroupModulePermissions: {
            moduleId: 0,
            hasViewAccess: false,
            hasCreateAccess: false,
            hasUpdateAccess: false,
            hasDeleteAccess: false,
            hasAccessRight: false
          }
        });
      }
      // });
    });
    return flatDataItems;
  }

  // ModuleTable Header CheckBox  Logic
  selectParentCheckBox(permission: string, event?: any) {
    if (event?.checked) {
      this.checkedPermission(permission, true);
    } else {
      this.checkedPermission(permission, false);
    }
  }

  // checked And UnChecked Permission
  checkedPermission(permission, isChecked) {
    switch (permission) {
      case 'hasViewAccess':
        this.accessGroups.forEach((element) => {
          element.accessGroupModulePermissions.hasViewAccess = isChecked;
        });
        break;
      case 'hasCreateAccess':
        this.accessGroups.forEach((element) => {
          element.accessGroupModulePermissions.hasCreateAccess = isChecked;
        });
        break;
      case 'hasUpdateAccess':
        this.accessGroups.forEach((element) => {
          element.accessGroupModulePermissions.hasUpdateAccess = isChecked;
        });
        break;
      case 'hasDeleteAccess':
        this.accessGroups.forEach((element) => {
          element.accessGroupModulePermissions.hasDeleteAccess = isChecked;
        });
        break;
      case 'hasAccessRight':
        this.accessGroups.forEach((element) => {
          var boolValue = this.config.header.radio.active.toString() === 'true';
          element.accessGroupModulePermissions.hasAccessRight = boolValue;
        });
        break;
      default:
        break;
    }
  }

  // OnSubmit Submit Button Click { Create And Update AccessGroup with Module Permission }
  onFormSubmit() {
    this.submitted = true;
    if (this.accessgroupForm.valid) {
      let setAccessGroup = [];
      setAccessGroup = this.setPermissions(this.accessGroups, setAccessGroup);
      const request = {
        accessGroupId: this.accessGroupModel?.accessGroupId,
        name: this.accessgroupForm.value?.name,
        description: this.accessgroupForm.value?.description,
        applicationId: this.accessgroupForm.value?.applicationId,
        departmentId: this.accessgroupForm.value?.departmentId,
        accessGroupModulePermissions: setAccessGroup,
        isActive: this.accessgroupForm.value?.isActive,
        userId: this.credentialsService.authinfo.PersonIdentifer
      };
      if (this.config.mode.isEdit) {
        this.accessGroupService
          .updateAccessGroup(request)
          .subscribe((data) => this.onCancelClick());
      } else {
        this.accessGroupService
          .createAccessGroup(request)
          .subscribe((data) => this.onCancelClick());
      }
    } else {
    }
  }

  //Set Permission Proper Format {OnSubmit Create And Update Json}
  setPermissions(permission: any[], flatDataItems: any[]) {
    permission.forEach((item) => {
      flatDataItems.push({
        moduleId: item.accessGroupModulePermissions.moduleId,
        hasViewAccess: item.accessGroupModulePermissions.hasViewAccess,
        hasCreateAccess: item.accessGroupModulePermissions.hasCreateAccess,
        hasUpdateAccess: item.accessGroupModulePermissions.hasUpdateAccess,
        hasDeleteAccess: item.accessGroupModulePermissions.hasDeleteAccess,
        hasAccessRight: item.accessGroupModulePermissions.hasAccessRight
      });
    });
    return flatDataItems;
  }

  // Cancel Button Click
  onCancelClick() {
    this.router.navigate(['/application-security/access-group']);
  }

  //On Destroy
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
