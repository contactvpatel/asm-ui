export const ApiConstants = {
  Auth: {
    requestToken: 'auth/secured/requesttoken',
    login: 'user/login',
    logout: 'user/logout',
  },
  EventTemplateType: 'EventTemplateType',
  EventTemplateSubType: 'EventTemplateSubType',
  EventTemplateSubTypeByTypeId: 'EventTemplateSubType/ByTypeId',
  EventTemplate: {
    all: 'EventTemplate',
    getbyid: 'EventTemplate/',
    manageevent: '/api/Event/ManageEvent',
    deleteevent: '/api/Event/DeleteEvent',
    publishevent: 'EventTemplate/Publish',
  },
  EventTemplateEntity: {
    all: '/Entity',
    ManageEventTemplateEntity: 'EventTemplate/Entity',
  },
  EventStatus: {
    all: 'EventStatus',
  },
  EventCategory: {
    all: 'api/EventCategory/GetEventCategories',
  },
  EventSubType: {
    all: 'api/EventSubType/GetEventSubTypes',
    manageeventsubtype: 'api/EventSubType',
    deleteeventsubtype: 'api/EventSubType',
  },
  EventSurvey: {
    all: '/Survey',
    GetById: '/Survey/',
    ManageEventSurvey: 'EventTemplate/Survey',
    SurveySettingUpdate: 'EventTemplate/SurveySetting',
    delete: 'EventTemplate/DeleteSurvey',
  },
  EventTemplateParticipant: {
    getById: '/Participant',
    ManageParticipant: 'EventTemplate/Participant',
  },
  EventTemplateVolunteer: {
    getById: '/Volunteer',
    ManageVolunteer: 'EventTemplate/Volunteer',
  },
  EventApproval: {
    all: '/Approval',
    GetById: '/Approval/',
    ManageEventApproval: 'EventTemplate/Approval',
    ApprovalSettingUpdate: 'EventTemplate/ApprovalSetting',
    delete: 'EventTemplate/DeleteEventApprover',
  },
  EventEntityTemplate: {
    all: 'EventEntityTemplate',
    getbyid: 'EventEntityTemplate/',
    publish: '/Publish',
  },
  EventEntityTemplateParticipant: {
    all: '/Participant',
  },
  EventEntityTemplateVolunteer: {
    all: '/Volunteer',
  },
  EventEntityTemplateSurvey: {
    all: '/Survey',
    getbyId: '/Survey/',
  },
  EventEntityTemplateApprovar: {
    all: '/Approval',
    getbyId: '/Approval/',
    delete: 'EventEntityTemplate/DeleteApproval',
    approvalsetting: 'EventEntityTemplate/ApprovalSetting',
  },
  SaveUserAuthInfo: {
    SaveUserData: 'api/UserAuth/SaveUserData',
  },
  Department: {
    all: 'Department',
  },
  Center: {
    all: 'Center',
  },
  CenterType: {
    all: 'CenterType',
  },
  GeoLevel: {
    all: 'GeoLevel',
  },
  Owner: {
    all: 'Owner',
  },
  Position: {
    all: 'Position',
  },
  Region: {
    all: 'Region',
  },
  Role: {
    all: 'Role',
  },
  Survey: {
    all: 'Survey',
  },
  ZoneType: {
    all: 'ZoneType',
  },
  EventFrequency: 'EventFrequency',
  EventEntityStatus: 'api/EventOccurrenceStatus/GetEventOccurrenceStatus',
};
export const ModuleAPI = {
  GetModuleByApplication:"modules/applications/",
  GetAllModule: 'modules',
  GetModuleType:'moduletypes',
  GetModuleById: 'modules/',
  UpdateModule: 'modules',
  CreateModule: 'Module/',
  DeleteModule: 'Module/',
  IsActiveModule: 'module/IsActive',
};
export const AccessGroupAPI = {
  GetAllAccessGroup: 'access-groups',
  
};
export const RoleApi = {
GetRole:"roles/"
}