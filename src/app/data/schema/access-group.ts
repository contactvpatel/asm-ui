import { ModuleType } from './module-type';
import { ParentModule } from './parent-module';
import { AccessGroupModulePermissions } from './access-group-permission';

export interface AccessGroupModel {
  accessGroupAssignmentId?: number;
  accessGroupId?: number;
  name?: string;
  description?: string;
  applicationId?: string;
  departmentId?: number;
  createdApplicationId?: string;
  lastUpdatedApplicationId?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  created?: string;
  createdBy?: number;
  lastUpdated?: string;
  lastUpdatedBy?: number;
  departmentName?: string;
  accessGroupModulePermissions?: AccessGroupModulePermissions;
}

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

  constructor() {}

  fromJson(jsonData: any, isEditMode = false): any {
    if (isEditMode) {
      return this.getEditModeAccessData(jsonData);
    } else {
      return this.getCreateModeAccessData(jsonData);
    }
  }

  private getCreateModeAccessData(jsonData): any {
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

  private getEditModeAccessData(jsonData): any {
    const accessData = [];
    jsonData.forEach((data) => {
      if (data.accessGroupModulePermissions.moduleId === 0) {
        data.accessGroupModulePermissions.moduleId = data.moduleId;
      }
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
