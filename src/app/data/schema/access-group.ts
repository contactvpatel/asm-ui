export interface AccessGroupModel {
    accessGroupAssignmentId?:number,
    accessGroupId?: number,
    name?: string,
    description?: string,
    applicationId?: string,
    departmentId?: number,
    createdApplicationId?: string,
    lastUpdatedApplicationId?: string,
    isActive?: boolean,
    isDeleted?: boolean,
    created?: string,
    createdBy?: number,
    lastUpdated?: string,
    lastUpdatedBy?: number,
    departmentName?: string            
}
export interface Department{
    
    departmentId: number,
    departmentName: string,
    departmentShortName: string,
    divisionId: number,
    wing: string,
    isSatsangActivityDepartment: boolean,
    isApplicationDepartment: boolean,
    isAdministrationDepartment: boolean
    
}