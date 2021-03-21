import { ModuleType } from './module-type';
import { ParentModule } from './parent-module';
import { AccessGroupModulePermissions } from './access-group-permission';

export interface Module {
  moduleId?: number;
  name?: string;
  applicationName?: string;
  code?: string;
  moduleTypeId?: number;
  applicationId?: string;
  parentModuleId?: number;
  isActive?: string;
  moduleType?: ModuleType;
  parentModule?: ParentModule;
  accessGroupModulePermissions?: AccessGroupModulePermissions;
}
