import { ModuleType } from './module-type';

export interface ParentModule {
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
