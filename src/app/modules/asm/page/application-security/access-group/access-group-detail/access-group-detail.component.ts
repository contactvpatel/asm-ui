import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessGroupModel, Department } from '@app/data/schema/access-group';
import { Utils } from '@app/shared/utils/util';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { AccessGroup, Application, Module } from '@app/data/schema/module';
import { ModuleService } from '@app/data/services/module.service';
import { applicationService } from '@app/data/services/application.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

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
  selectAccess: boolean;
  selectedApplication: Application;
  application: Application[];
  selectedDepartment: Department;
  department: Department[];
  accessGroups: AccessGroup[];
  submitted = false;
  accessgroupForm: FormGroup;
  activatedRoute$: null;
  readonly config = {
    mode: {
      isEdit: false
    }
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private moduleService: ModuleService,
    private applicationService: applicationService,
    private accessGroupService: AccessGroupService
  ) {
    
  }

  ngOnInit(): void {
    // this.module = this.activatedRoute.snapshot.data.accessGroup;

    this.accessGroup = {} as AccessGroup;
    this.createForm();
    this.departmentList();
    this.subscribeActivatedRoute();
    this.GetApplication();
  }
  private setEditFormData() {
    this.accessgroupForm.setValue({
      name: this.accessGroupModel.name,
      description: this.accessGroupModel.description,
      applicationId: this.accessGroupModel.applicationId,
      departmentId: this.accessGroupModel.departmentId
    });
  }
  private subscribeActivatedRoute(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const accessGroupId = params.get('id');
      if (accessGroupId) {
        this.GetAccessGroupById(+accessGroupId);

        this.config.mode.isEdit = true;
      } else {
        this.config.mode.isEdit = false;
        this.accessGroup = {} as AccessGroup;
      }
    });
  }

  createForm() {
    this.accessgroupForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      applicationId: [null, [Validators.required]],
      departmentId: [null]
    });
  }
  onCancelClick() {
    this.router.navigate(['asm/application-security/access-group']);
  }
  get DepartmentId(): any {
    return this.accessgroupForm.get('departmentId');
  }
  get ApplicationId(): any {
    return this.accessgroupForm.get('applicationId');
  }
  get name(): any {
    return this.accessgroupForm.get('name');
  }
  get description(): any {
    return this.accessgroupForm.get('description');
  }
  onFormSubmit() {
    this.submitted = true;
    const c = this.DepartmentId.value;

    if (this.accessgroupForm.valid) {
      if (this.config.mode.isEdit) {
        let setAccessGroup = [];
        const departmentId = this.DepartmentId.value;

        const name = this.name.value;
        const description = this.description.value;
        const applicationId=this.ApplicationId.value;
        setAccessGroup = this.setPermissions(this.accessGroups, setAccessGroup);
        console.log(setAccessGroup);
        const request = {
          accessGroupId: this.accessGroupModel.accessGroupId,
          name: name,
          description: description,
          applicationId: applicationId,
          departmentId: departmentId,
          accessGroupModulePermissions: setAccessGroup,
          isActive: true,
          userId: 0
        };
        console.log(request);
        this.accessGroupService
          .updateAccessGroup(request)
          .then((data) => this.onCancelClick());
      } else {
        let setAccessGroup = [];
        setAccessGroup = this.setPermissions(this.accessGroups, setAccessGroup);
        const departmentId = this.DepartmentId.value;
        console.log(departmentId)
        const name = this.name.value;
        const description = this.description.value;
        const applicationId=this.ApplicationId.value;
        const request = {
          name: name,
          description: description,
          applicationId: applicationId,
          departmentId: departmentId,
          accessGroupModulePermissions: setAccessGroup
        };

        this.accessGroupService
          .createAccessGroup(request)
          .then((data) => this.onCancelClick());
      }
    } else {
    }
  }
  // this.submitted = true;
  // if (this.accessgroupForm.valid) {
  //   console.log("success")
  // }
  // else{
  //   console.log("fail")
  // }
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

  GetAccessGroupById(id: number) {
    this.accessGroupService.getAccessGroupById(id).then((data) => {
      this.accessGroupModel = data;
      this.setEditFormData();
      this.moduleService.getModules().then((data) => {
        (this.module = data), this.setmodule();
      });
    });
  }
  setmodule() {
    let accessGroup = [];
    accessGroup = this.setEditAccessGroup(
      this.module,
      this.accessGroupModel.accessGroupModulePermissions,
      accessGroup
    );
    this.accessGroups = new AccessGroup().fromJson(accessGroup, true);
  }
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
  // get DepartmentId(): any {
  //   return this.accessgroupForm.get('applicationId');
  // }
  getAllModule() {
    let applicationId;
    if (this.ApplicationId.value === null) {
      applicationId = '00000000-0000-0000-0000-000000000000';
    } else {
      applicationId = this.ApplicationId.value;
    }

    this.moduleService.getModulesByApplicationId(applicationId).then((data) => {
      this.accessGroups = new AccessGroup().fromJson(data);
      
    });
  }
  GetApplication(){
    this.applicationService
      .getApplication()
      .then((data) => (this.application = data));
  }
  departmentList() {
    this.accessGroupService
      .getDepartment()
      .then((data) => (this.department = data));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
