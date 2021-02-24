import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessGroupModel, Department } from '@app/data/schema/access-group';
import { Position, Role } from '@app/data/schema/access-group-assgnment';
import { AccessGroup, Application, Module } from '@app/data/schema/module';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { applicationService } from '@app/data/services/application.service';
import { ModuleService } from '@app/data/services/module.service';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { Utils } from '@app/shared/utils/util';
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
  module:Module[];
  accessgroupAssignmentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private moduleService: ModuleService,
    private applicationService:applicationService,
    private accessGroupAssignmentService: AccessGroupAssignmentService,
    private accessGroupService: AccessGroupService,
    private fb: FormBuilder
  ) {
    
  }

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
      description: [null, [Validators.required]],
      applicationId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]]      
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
    this.accessgroupAssignmentForm.value;
    
    this.submitted = true;
    let accessgroupassignment = [];
    
    if (this.selectedRoleList !== null) {
      accessgroupassignment = this.setPermissions(
        this.selectedRoleList,
        accessgroupassignment,
        this.selectaccessGroup
      );
    } else if (this.selectedPosition !== null) {
      accessgroupassignment = this.setRoleAndPosition(
        accessgroupassignment,
        this.selectedPosition,
        this.selectaccessGroup
      );
    }
    this.accessGroupAssignmentService
      .createAccessGroupAssignment(accessgroupassignment)
      .then((data)=>this.onCancelClick());
  }
  setPermissions(
    permission: any[],
    flatDataItems: any[],
    accessGroupId: any
  ): any[] {
    permission.forEach((data) => {
      flatDataItems.push({
        accessGroupId: accessGroupId.accessGroupId,
        roleId: data.roleId,
        positionId: 0,
        personId: 0
      });
    });
    return flatDataItems;
  }

  setRoleAndPosition(
    accessGroupassignment: any[],
    roleList: any[],
    accessGroupId: any
  ): any[] {
    roleList.forEach((data) => {
      accessGroupassignment.push({
        accessGroupId: accessGroupId.accessGroupId,
        roleId: data.roleId,
        positionId: data.positionId,
        personId: 0
      });
    });
    return accessGroupassignment;
  }

  GetAccessGroup(): void {
    const departmentId = this.selectedDepartment.departmentId;
    const applicationId= this.selectedApplication.applicationId;
    this.accessGroupService
      .getAccessGroupByApplicationIdAndDepartmentId(applicationId,departmentId)
      .then((data) => (this.accessGroupList = data));
  }
  GetRole(): void {
    // let departmentId;
    // if (this.selectedDepartment !== null) {
    //   departmentId = this.selectedDepartment.departmentId;
    // } else {
    //   departmentId = 0;
    // }
    // this.accessGroupAssignmentService
    //   .getRoleByDepartmentId(departmentId)
    //   .then((data) => (this.role = data));
  }
  GetallRole(): void {
    this.accessGroupAssignmentService
      .getAllRole()
      .then((data) => (this.role = data));
  }
  ShowRole(): void {
    this.selectedRole = null;
    this.selectedPosition = null;
    this.showPosition = false;
    this.showRole = true;
    this.showPerson = false;
  }
  ShowPosition(): void {
    this.selectedRole = null;
    this.selectedRoleList = null;
    this.selectedPosition = null;
    this.showRole = false;
    this.showPosition = true;
    this.showPerson = false;
  }
  GetPosition(): void {
    this.accessGroupAssignmentService
      .getPositionByRoleId(this.selectedRole.roleId)
      .then((data) => (this.position = data));
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
    let applicationId = null;
    if (this.selectedApplication === null) {
      applicationId = '00000000-0000-0000-0000-000000000000';
    } else {
      applicationId = this.selectedApplication.applicationId;
    }
    this.accessGroupService.getAccessGroupById(this.selectaccessGroup.accessGroupId).then((data) => {
      this.accessGroupModel = data;          
      this.moduleService.getModules().then((data) => {
      (this.module = data), this.setmodule();
      });
    });   
  }
getApplication(){
this.applicationService.getApplication().then((data)=>(this.application=data,console.log(this.application)))
}

  setmodule() {
    let accessGroup = [];
    
    accessGroup = this.setEditAccessGroup(
      this.module,
      this.accessGroupModel.accessGroupModulePermissions,
      accessGroup
    );
    
    this.accessGroups = new AccessGroup().fromJson(accessGroup,true);
    
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
          moduleType:{
            name: item.moduleType.name,
            isControlType:item.moduleType.isControlType
          },
          parentModule:{
         name: item.parentModule === null ? '' : item.parentModule.name},
          accessGroupModulePermissions:{
            moduleId:permissionFound.moduleId,
          hasViewAccess: permissionFound.hasViewAccess,
          hasCreateAccess: permissionFound.hasCreateAccess,
          hasUpdateAccess: permissionFound.hasUpdateAccess,
          hasDeleteAccess: permissionFound.hasDeleteAccess,
          hasAccessRight: permissionFound.hasAccessRight}
        });
      } else {
        flatDataItems.push({
          moduleId: item.moduleId,          
          name: item.name,
          moduleType:{
            name: item.moduleType.name,
            isControlType:item.moduleType.isControlType
          },
          parentModule:{
         name: item.parentModule === null ? '' : item.parentModule.name},
          accessGroupModulePermissions:{
            moduleId:0,
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
      .then((data) => (this.department = data));
  }

  /***********************Public method *****************/
}
