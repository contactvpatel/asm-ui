export interface AccessGroupModulePermissions {
  moduleId: number;
  hasViewAccess: boolean;
  hasCreateAccess: boolean;
  hasUpdateAccess: boolean;
  hasDeleteAccess: boolean;
  hasAccessRight: boolean;
  accessGroupId?: number;
}
