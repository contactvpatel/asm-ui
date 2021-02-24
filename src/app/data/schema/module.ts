export interface Module {
  moduleId?: number;
  name?: string;
  applicationName?:string,
  code?: string;
  moduleTypeId?: number;
  applicationId?: string;
  parentModuleId?: number;
  isActive?: string;
  moduleType?: ModuleType;
  parentModule?: ParentModule;
  accessGroupModulePermissions?: AccessGroupModulePermissions;
}

export interface Application {
  applicationId: string;
  applicationName: string;
}
export interface IsActive {
  
  isActive: string;
}
// export interface ModuleType
// {
//   moduleTypeId: number,
//   name: string,
//   isControlType: boolean,
//   isActive: boolean,
//   isDeleted: boolean,
//   lastUpdated: string
// }

export class AccessGroup {
  accessGroupId: number;
  name: string;
  description: string;
  applicationId: string;
  applicationName?: string;
  moduleId: number;
  code: string;
  moduleTypeId: number;
  parentModuleId: number;
  isActive: boolean;
  moduleType: ModuleType;
  parentModule: ParentModule;
  accessGroupModulePermissions: AccessGroupModulePermissions;
  showCheckbox: boolean;
  departmentId?: number;
  createdApplicationId?: string;
  lastUpdatedApplicationId?: string;
  isDeleted?: boolean;
  created?: string;
  createdBy?: number;
  lastUpdated?: string;
  lastUpdatedBy?: number;
  departmentName?: string;

  /**
   *
   */
  constructor() {}

  fromJson(jsonData: any, isEditMode = false) {
    if (isEditMode) {
      return this.getEditModeAccessData(jsonData);
    } else {
      return this.getCreateModeAccessData(jsonData);
    }
  }

  private getCreateModeAccessData(jsonData) {
    const accessData = [];
    jsonData.forEach((data) => {
      accessData.push({
        moduleId: data.moduleId,
        name: data.name,
        code: data.code,
        moduleTypeId: data.moduleTypeId,
        applicationId: data.applicationId,
        parentModuleId: data.parentModuleId,
        isActive: data.isActive,
        moduleType: data.moduleType,
        parentModule: data.parentModule,
        accessGroupModulePermissions: this.getAccessGroupModulePermissionsForCreateMode(
          data
        ),
        description: data.description,
        showCheckbox: data.moduleType.isControlType === false ? true : false
      });
    });
    return accessData;
  }

  private getEditModeAccessData(jsonData) {
    const accessData = [];
    jsonData.forEach((data) => {
      accessData.push({
        moduleId: data.moduleId,
        name: data.name,                
        moduleType: data.moduleType,
        parentModule: data.parentModule,
        accessGroupModulePermissions: this.getAccessGroupModulePermissionsForEditMode(
          data.accessGroupModulePermissions
        ),
        description: data.description,
        showCheckbox: data.moduleType.isControlType === false ? true : false
      });
    });
    return accessData;
  }

  getAccessGroupModulePermissionsForCreateMode(
    data
  ): AccessGroupModulePermissions {
    const accessGroupModulePermissions: AccessGroupModulePermissions = {
      moduleId: data.moduleId,
      hasViewAccess: false,
      hasCreateAccess: false,
      hasUpdateAccess: false,
      hasDeleteAccess: false,
      hasAccessRight: false
    };
    return accessGroupModulePermissions;
  }

  getAccessGroupModulePermissionsForEditMode(
    data
  ): AccessGroupModulePermissions {
    console.log(data)
    const accessGroupModulePermissions: AccessGroupModulePermissions = {
      moduleId: data.moduleId,      
      hasViewAccess: data.hasViewAccess,
      hasCreateAccess: data.hasCreateAccess,
      hasUpdateAccess: data.hasUpdateAccess,
      hasDeleteAccess: data.hasDeleteAccess,
      hasAccessRight: data.hasAccessRight
    };

    return accessGroupModulePermissions;
  }
}

interface AccessGroupModulePermissions {
  moduleId: number;
  hasViewAccess: boolean;
  hasCreateAccess: boolean;
  hasUpdateAccess: boolean;
  hasDeleteAccess: boolean;
  hasAccessRight: boolean;

  accessGroupId?: number;
}
export interface ModuleType {
  moduleTypeId: number;
  name: string;
  isControlType: boolean;
  isActive: boolean;
  isDeleted: boolean;
  lastUpdated: string;
}

interface ParentModule {
  moduleId: number;
  name: string;
  code: string;
  moduleTypeId: number;
  applicationId: string;
  parentModuleId: number;
  isActive: boolean;
  moduleType: ModuleType;
  parentModule: ParentModule;
}
