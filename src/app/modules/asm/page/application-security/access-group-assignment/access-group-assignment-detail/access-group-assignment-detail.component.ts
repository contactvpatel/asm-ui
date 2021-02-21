import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessGroupModel, Department } from '@app/data/schema/access-group';
import { Position, Role } from '@app/data/schema/access-group-assgnment';
import { AccessGroup, Application } from '@app/data/schema/module';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { AccessGroupService } from '@app/data/services/access-group.service';
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
  
  accessgroupAssignmentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private moduleService: ModuleService,
    private accessGroupAssignmentService: AccessGroupAssignmentService,
    private accessGroupService: AccessGroupService,
    private fb: FormBuilder
  ) {
    this.application = [
      { id: 'A23B4841-10BF-4DE0-AD84-25E7ADF7EA7A', name: 'PBR' }
    ];
  }

  /****************Lifecycle methods**************/
  ngOnInit(): void {
    this.accessGroup = {} as AccessGroup;
    this.createForm();
    this.GetAccessGroup();
    this.departmentList();
    this.GetallRole();
    
  }

  createForm() {
    this.accessgroupAssignmentForm = this.fb.group({
      accessgroupassignment: [null, [Validators.required]],
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
    console.log(this.accessgroupAssignmentForm.value)
    this.submitted = true;
    let accessgroupassignment = [];
    console.log(this.accessGroups);
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
      .then((data) => console.log(data));
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
    this.accessGroupService
      .getAccessGroup()
      .then((data) => (this.accessGroupList = data));
  }
  GetRole(): void {
    let departmentId;
    if (this.selectedDepartment !== null) {
      departmentId = this.selectedDepartment.departmentId;
    } else {
      departmentId = 0;
    }
    this.accessGroupAssignmentService
      .getRoleByDepartmentId(departmentId)
      .then((data) => (this.role = data));
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
      applicationId = this.selectedApplication.id;
    }

    this.moduleService.getModulesByApplicationId(applicationId).then((data) => {
      this.accessGroups = new AccessGroup().fromJson(data);
      console.log(this.accessGroups);
    });
  }

  departmentList(): void {
    this.accessGroupService
      .getDepartment()
      .then((data) => (this.department = data));
  }

  /***********************Public method *****************/
}
