import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '@app/data/schema/access-group';
import { Utils } from '@app/shared/utils/util';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { AccessGroup, Application, Module } from '@app/data/schema/module';
import { ModuleService } from '@app/data/services/module.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-access-group-detail',
  templateUrl: './access-group-detail.component.html',
  styleUrls: ['./access-group-detail.component.scss'],
  providers: [ ConfirmationService],
})
export class AccessGroupDetailComponent implements OnInit, OnDestroy {
  accessGroup: AccessGroup;
  subscription: Subscription;
  selectAccess:boolean;
  selectedApplication: Application;
  application: Application[];
  selectedDepartment: Department;
  department: Department[];
  accessGroups: AccessGroup[];
  submitted = false;
  accessgroupForm: FormGroup;
  // accessgroupForm = new FormGroup({
    
  //   name: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  //   applicationId: new FormControl('', [Validators.required]),
  //   departmentId: new FormControl('', [Validators.required])    
  //   });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private moduleService: ModuleService,
    private accessGroupService: AccessGroupService
  ) {this.application = [
    {id:"A23B4841-10BF-4DE0-AD84-25E7ADF7EA7A" , name: 'PBR'}       
];
}

  ngOnInit(): void {
    this.accessGroup = {} as AccessGroup;
    
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
  createForm() {
    this.accessgroupForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      applicationId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]]
    });
  }
  onCancelClick() {
    this.router.navigate(['asm/access-group']);
  }
  onFormSubmit() {
    this.submitted = true;
    
    if (this.accessGroup.name.trim()) {
      let getPermissions = [];

    getPermissions = this.setPermissions(this.accessGroups,getPermissions);
      const request = {
        name: this.accessGroup.name,        
        description: this.accessGroup.description,
        applicationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        departmentId: this.selectedDepartment.departmentId,
        accessGroupModulePermissions:getPermissions
      };      
     console.log(request)
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
      this.accessGroups = new AccessGroup().fromJson(data);
      console.log(this.accessGroups)
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
