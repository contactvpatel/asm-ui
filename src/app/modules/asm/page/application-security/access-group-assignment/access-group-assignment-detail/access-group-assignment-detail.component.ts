import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { AccessGroupModel, Department } from '@app/data/schema/access-group';
import { Utils } from '@app/shared/utils/util';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import {  AccessGroup, Application, Module } from '@app/data/schema/product';

import { ModuleService } from '@app/data/services/module.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { applicationId } from '@app/shared/constants/global.constant';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Position, Role } from '@app/data/schema/access-group-assgnment';

@Component({
  selector: 'app-access-group-assignment-detail',
  templateUrl: './access-group-assignment-detail.component.html',
  styleUrls: ['./access-group-assignment-detail.component.scss'],
  providers: [EncryptPipe, ConfirmationService],
})
export class AccessAssignmentGroupDetailComponent implements OnInit, OnDestroy {
  accessGroup: AccessGroup;
  accessGroupList:AccessGroupModel[];
  selectaccessGroup:AccessGroupModel;
  subscription: Subscription;
  selectAccess:boolean;
  selectedApplication: Application;
  application: Application[];
  selectedDepartment: Department;
  department: Department[];
  role:Role[];
  selectedRoleList:Role[];
  selectedRole:Role;
  position:Position[];
  selectedPosition:Position[];
  modules: AccessGroup[];
  submitted = false;
  showRole=false;
  showPosition=false;
  showPerson=false;
  // accessgroupForm = new FormGroup({
    
  //   name: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  //   applicationId: new FormControl('', [Validators.required]),
  //   departmentId: new FormControl('', [Validators.required])    
  //   });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private moduleService: ModuleService,
    private accessGroupAssignmentService: AccessGroupAssignmentService,
    private accessGroupService: AccessGroupService
  ) {this.application = [
    {id:"A23B4841-10BF-4DE0-AD84-25E7ADF7EA7A" , name: 'PBR'}       
];
}

  ngOnInit(): void {
    this.accessGroup = {} as AccessGroup;
    this.GetAccessGroup();
    this.departmentList();
    this.GetallRole();
    this.route.paramMap.subscribe((params) => {
      const accessGroupId = Utils.decrypt(params.get('id')) || 0;
      if (accessGroupId > 0) {
        this.GetAccessGroupById(accessGroupId);
      } else {
        this.accessGroup = {} as AccessGroup;
      }
    });
  }
  onCancelClick() {
    this.router.navigate(['asm/access-group-assignment']);
  }
  onFormSubmit() {
    this.submitted = true;
    let accessgroupassignment =[];
    console.log( this.modules);
    if (this.selectedRoleList!==null) {
      accessgroupassignment = this.setPermissions(this.selectedRoleList,accessgroupassignment,this.selectaccessGroup);
    }
    else if(this.selectedPosition!==null)
    {
      accessgroupassignment = this.setRoleAndPosition(accessgroupassignment,this.selectedPosition,this.selectaccessGroup);
    }
    console.log(accessgroupassignment);
   

    this.accessGroupAssignmentService.createAccessGroupAssignment(accessgroupassignment).then((data) => (console.log(data)));
    }
    setPermissions(
      permission: any[],
      flatDataItems: any[] ,  
      accessGroupId:any    
    ) {
      permission.forEach((data) => {
          flatDataItems.push({ 
            accessGroupId: accessGroupId.accessGroupId,
            roleId: data.roleId,
            positionId: 0,
            personId: 0,
        });
      });
      return flatDataItems;
    }
    
    setRoleAndPosition(      
      accessGroupassignment: any[],
      roleList:any[],
      accessGroupId:any      
    ) {
      roleList.forEach((data) => {
        accessGroupassignment.push({ 
          accessGroupId: accessGroupId.accessGroupId,
          roleId: data.roleId,
          positionId: data.positionId,
          personId: 0,
        });
      });
      return accessGroupassignment;
    }
  GetAccessGroupById(id: number) {
    /*
    this.accessGroupService.GetEventById(id).subscribe(res => {
      this.accessGroup= res.body.data
    });
    */
  }
  GetAccessGroup()
  {
    this.accessGroupService.getAccessGroup().then((data) => (this.accessGroupList = data));      
  }
  GetRole()
  {
    let departmentId;
   if(this.selectedDepartment!==null)
   {
    departmentId=this.selectedDepartment.departmentId
   } 
   else
   {
    departmentId=0;
   }
   this.accessGroupAssignmentService.getRoleByDepartmentId(departmentId).then((data) => (this.role = data));        
  }
  GetallRole()
  {
    this.accessGroupAssignmentService.getAllRole().then((data) => (this.role = data));    
  }
  ShowRole(){
    this.selectedRole=null;
    this.selectedPosition=null;
    this.showPosition=false;
    this.showRole=true;
    this.showPerson=false;
  }
  ShowPosition(){
    this.selectedRole=null;
    this.selectedRoleList=null;
    this.selectedPosition=null;
    this.showRole=false;
    this.showPosition=true;
    this.showPerson=false;
  }
  GetPosition(){
    this.accessGroupAssignmentService.getPositionByRoleId(
                                                this.selectedRole.roleId).then((data) => (this.position= data));    
  }
  ShowPerson(){
   this.selectedRole = null;
   this.selectedPosition = null;
   this.showRole = false;
   this.showPosition = false;
   this.showPerson = true;
   this.selectedRoleList=null;
  }
  
  getAllModule(){
   let applicationId;
    if(this.selectedApplication===null)
    {      
      applicationId="00000000-0000-0000-0000-000000000000";
    }
    else{
      applicationId=this.selectedApplication.id
    }

    this.moduleService.getModulesByApplicationId(applicationId).then((data) => {
      this.modules = new AccessGroup().fromJson(data);
      console.log(this.modules)
    });
  }
  departmentList()
  {
    this.accessGroupService.getDepartment().then((data) => (this.department = data));    
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
