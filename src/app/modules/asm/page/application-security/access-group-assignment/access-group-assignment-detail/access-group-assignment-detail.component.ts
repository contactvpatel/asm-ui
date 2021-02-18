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
import { Role } from '@app/data/schema/access-group-assgnment';

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
  selectedRole:Role[];
  modules: AccessGroup[];
  submitted = false;
  
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
    
    if (this.accessGroup.name.trim()) {
      let getPermissions = [];

    getPermissions = this.setPermissions(this.modules,getPermissions);
      const request = {
        name: this.accessGroup.name,        
        description: this.accessGroup.description,
        applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        departmentId: this.selectedDepartment.departmentId,
        accessGroupModulePermissions:getPermissions
      };      
      this.accessGroupService.createAccessGroup(request).then((data)=>(this.onCancelClick()));    

      } else {
        console.log("edite")
      }      
    }
    // this.submitted = true;
    // if (this.accessgroupForm.valid) {
    //   console.log("success")
    // }
    // else{
    //   console.log("fail")
    // }
    setPermissions(
      permission: any[],
      flatDataItems: any[]      
    ) {
      permission.forEach((item) => {
          flatDataItems.push({ 
                               moduleId : item.accessGroupModulePermissions.moduleId,
                               hasViewAccess : item.accessGroupModulePermissions.hasViewAccess,
                               hasCreateAccess: item.accessGroupModulePermissions.hasCreateAccess,                     
                               hasUpdateAccess: item.accessGroupModulePermissions.hasUpdateAccess,
                               hasDeleteAccess: item.accessGroupModulePermissions.hasDeleteAccess,
                               hasAccessRight :item.accessGroupModulePermissions.hasAccessRight
                               });
      });
      return flatDataItems;
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
    this.accessGroupAssignmentService.getRoleByDepartmentId(this.selectedDepartment.departmentId).then((data) => (this.role = data));    
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
