export enum EmployeesModuleExceptionType {
  ENTITY_NOT_FOUND,
}

export class EmployeesModuleException extends Error {
  constructor(readonly type: EmployeesModuleExceptionType, message?: string) {
    super(message)
  }
}
