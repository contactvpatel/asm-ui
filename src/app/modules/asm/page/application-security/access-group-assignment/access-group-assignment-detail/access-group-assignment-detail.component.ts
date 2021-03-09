import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessGroupModel, Department } from '@app/data/schema/access-group';
import { Position, Role } from '@app/data/schema/access-group-assignment';
import { AccessGroup, Application, Module } from '@app/data/schema/module';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { applicationService } from '@app/data/services/application.service';
import { ModuleService } from '@app/data/services/module.service';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access-group-assignment-detail',
  templateUrl: './access-group-assignment-detail.component.html',
  styleUrls: ['./access-group-assignment-detail.component.scss'],
  providers: [EncryptPipe, ConfirmationService]
})
export class AccessAssignmentGroupDetailComponent implements OnInit, OnDestroy {
  accessGroup: AccessGroup;
  accessGroupList: AccessGroupModel[];
  selectaccessGroup: AccessGroupModel;
  accessGroupModel: AccessGroupModel;
  subscription: Subscription;
  selectAccess: boolean;
  selectedApplication: Application;
  application: Application[];
  selectedDepartment: Department;
  department: Department[];
  role: Role[];
  selectedRoleList: Role[];
  selectedRole: Role;
  position: Position[];
  selectedPosition: Position[];
  accessGroups: AccessGroup[];
  submitted = false;
  showRole = false;
  showPosition = false;
  showPerson = false;
  module: Module[];
  accessgroupAssignmentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private moduleService: ModuleService,
    private applicationService: applicationService,
    private accessGroupAssignmentService: AccessGroupAssignmentService,
    private accessGroupService: AccessGroupService,
    private fb: FormBuilder
  ) {}

  /****************Lifecycle methods**************/
  ngOnInit(): void {
    this.accessGroup = {} as AccessGroup;
    this.createForm();
    this.getApplication();
    this.departmentList();
    this.GetallRole();
  }

  createForm() {
    this.accessgroupAssignmentForm = this.fb.group({
      assignmentType: [null, [Validators.required]],
      applicationId: [null, [Validators.required]],
      accessGroupId: [null, [Validators.required]],
      departmentId: [null],
      roleId: [null],
      positionId: [null]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /****************Lifecycle methods**************/

  /***********************Public method *****************/
  onCancelClick(): void {
    this.router.navigate(['asm/access-group-assignment']);
  }
  onFormSubmit(): void {
    this.submitted = true;
    if (this.accessgroupAssignmentForm.valid) {
      let accessgroupassignment = [];
      if (this.RoleId.value.length >= 1) {
        accessgroupassignment = this.setRole(
          this.RoleId.value,
          accessgroupassignment,
          this.accessgroupAssignmentForm.value
        );
      } else if (this.PositionId !== null) {
        accessgroupassignment = this.setRoleAndPosition(
          accessgroupassignment,
          this.RoleId.value,
          this.PositionId.value,
          this.accessgroupAssignmentForm.value
        );
      }

      this.accessGroupAssignmentService
        .createAccessGroupAssignment(accessgroupassignment)
        .subscribe((data) => this.onCancelClick());
    }
  }
  setRole(roleId: any[], flatDataItems: any[], accessGroupId: any): any[] {
    roleId.forEach((data) => {
      flatDataItems.push({
        accessGroupId: accessGroupId.accessGroupId,
        roleId: data,
        positionId: null,
        personId: null
      });
    });
    return flatDataItems;
  }

  setRoleAndPosition(
    accessGroupassignment: any[],
    roleId: any[],
    positionList: any[],
    accessGroupId: any
  ): any[] {
    positionList.forEach((data) => {
      accessGroupassignment.push({
        accessGroupId: accessGroupId.accessGroupId,
        roleId: roleId,
        positionId: data,
        personId: 0
      });
    });
    return accessGroupassignment;
  }
  get AccessGroupId(): any {
    return this.accessgroupAssignmentForm.get('accessGroupId');
  }
  get RoleId(): any {
    return this.accessgroupAssignmentForm.get('roleId');
  }
  get PositionId(): any {
    return this.accessgroupAssignmentForm.get('positionId');
  }
  get ApplicationId(): any {
    return this.accessgroupAssignmentForm.get('applicationId');
  }
  get DepartmentId(): any {
    return this.accessgroupAssignmentForm.get('departmentId');
  }
  GetAccessGroup(): void {
    this.accessGroupList = [];
    this.accessGroups = [];
    this.AccessGroupId.value = 0;
    const applicationId = this.ApplicationId.value;
    const departmentId = this.DepartmentId.value;

    if (applicationId !== null) {
      if (departmentId == undefined || departmentId == null) {
        this.accessGroupService
          .getAccessGroupByApplicationIdAndDepartmentId(applicationId, 0)
          .subscribe((data) => (this.accessGroupList = data));
      } else {
        this.accessGroupService
          .getAccessGroupByApplicationIdAndDepartmentId(
            applicationId,
            departmentId
          )
          .subscribe((data) => (this.accessGroupList = data));
      }
    } else {
      this.accessGroupList = null;
    }
  }

  GetRole(): void {
    this.role = null;
    let departmentId;
    if (this.DepartmentId.value !== null) {
      departmentId = this.DepartmentId.value;
    } else {
      departmentId = 0;
    }
    this.accessGroupAssignmentService
      .getRoleByDepartmentId(departmentId)
      .subscribe((data) => (this.role = data));
  }
  GetallRole(): void {
    this.accessGroupAssignmentService
      .getAllRole()
      .subscribe((data) => (this.role = data));
  }
  ShowRole(): void {
    this.RoleId.value = null;
    this.selectedRole = null;
    this.selectedPosition = null;
    this.showPosition = false;
    this.showRole = true;
    this.showPerson = false;
    this.accessgroupAssignmentForm.controls['positionId'].setValidators(null);
    this.accessgroupAssignmentForm.controls[
      'positionId'
    ].updateValueAndValidity();
    this.accessgroupAssignmentForm.controls['roleId'].setValidators([
      Validators.required
    ]);
    this.accessgroupAssignmentForm.controls['roleId'].updateValueAndValidity();
  }
  ShowPosition(): void {
    this.RoleId.value = null;
    this.selectedRole = null;
    this.selectedRoleList = null;
    this.selectedPosition = null;
    this.showRole = false;
    this.showPosition = true;
    this.showPerson = false;
    this.accessgroupAssignmentForm.controls['roleId'].setValidators(null);
    this.accessgroupAssignmentForm.controls['roleId'].updateValueAndValidity();
    this.accessgroupAssignmentForm.controls['roleId'].setValidators([
      Validators.required
    ]);
    this.accessgroupAssignmentForm.controls['roleId'].updateValueAndValidity();
    this.accessgroupAssignmentForm.controls['positionId'].setValidators([
      Validators.required
    ]);
    this.accessgroupAssignmentForm.controls[
      'positionId'
    ].updateValueAndValidity();
  }
  GetPosition(): void {
    this.position = [];
    this.accessGroupAssignmentService
      .getPositionByRoleId(this.RoleId.value)
      .subscribe((data) => (this.position = data));
  }
  ShowPerson(): void {
    this.selectedRole = null;
    this.selectedPosition = null;
    this.showRole = false;
    this.showPosition = false;
    this.showPerson = true;
    this.selectedRoleList = null;
  }

  getAllModule(): void {
    this.accessGroups = [];
    this.accessGroupService
      .getAccessGroupById(this.AccessGroupId.value)
      .subscribe((data) => {
        this.accessGroupModel = data;
        this.moduleService
          .getModulesByApplicationId(data.applicationId)
          .subscribe((data) => {
            (this.module = data), this.setmodule();
          });
      });
  }
  getApplication() {
    this.applicationService
      .getApplication()
      .subscribe((data) => (this.application = data));
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

  departmentList(): void {
    this.accessGroupService
      .getDepartment()
      .subscribe((data) => (this.department = data));
  }

  /***********************Public method *****************/
}
