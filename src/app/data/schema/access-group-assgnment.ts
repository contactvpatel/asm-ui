export interface Role {
 roleId: number,
 roleName: string,
 divisionId: number,
 divisionName: string,
 divisionGeoLevelId: number,
 divisionGeoLevelName: string,
 departmentId: number,
 departmentName: string,
 wing: string,
 isApplicationDepartment:boolean,
 isAdministrationDepartment: boolean      
}
export interface Position {
 positionId: number,
 positionName: string,
 positionShortName: string,
 roleId: number,
 roleName: string,
 departmentId: number,
 departmentName: string,
 rolePositionEntityId: number,
 rolePositionEntityName: string,
 personId: number,
 wing: string,
 isApplicationDepartment: boolean,
 isAdministrationDepartment: boolean,
}