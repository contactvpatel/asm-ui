export const UserAuthApi = {
  RequestToken: 'auth/secured/requesttoken',
  Login: 'user/login',
  Logout: 'user/logout'
};

export const ModuleApi = {
  GetModuleByApplication: 'modules/applications/',
  GetAllModule: 'modules',
  GetModuleType: 'moduletypes',
  GetModuleById: 'modules/',
  UpdateModule: 'modules',
  CreateModule: 'Module/',
  DeleteModule: 'Module/',
  IsActiveModule: 'module/IsActive'
};

export const AccessGroupApi = {
  GetAllAccessGroup: 'access-groups'
};

export const RoleApi = {
  GetRoleByDepartment: 'roles/departments/',
  GetRole: 'roles'
};

export const PositionApi = {
  GetPosition: 'positions/'
};

export const AccessGroupAssignmentApi = {
  GetAccessGroupAssignment: 'access-group-assignments',
  CreateAccessGroupAssignment: 'access-group-assignments',
  DeleteAccessGroupAssignment: 'access-group-assignments/'
};

export const ApplicationApi = {
  GetApplication: 'applications'
};
