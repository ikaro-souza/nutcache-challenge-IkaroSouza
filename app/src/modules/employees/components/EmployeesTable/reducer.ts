import { Employee } from 'modules/employees/models'

export interface Row {
  id: string
  name: string
  birthDate: string
  gender: string
  email: string
  cpf: string
  startDate: string
  team: string
}

export interface TableState {
  /** @property Controls whether to open the dialog used for creating an employee's data */
  showCreateEmployeeDialog: boolean
  /** @property Controls whether to open the dialog used for updating an employee's data */
  showEditEmployeeDialog: boolean
  /** @property Controls whether to open the dialog used for removing an employee */
  showRemoveEmployeeDialog: boolean
  /** @property The id of the employee to be edited or removed */
  targetEmployeeId?: string
  /** @property Whether the fetching for employees hasn't finished yet */
  loading: boolean
  /** @property List of the company's employees */
  employees: Employee[]
  /** @property Error thrown while trying to fetch the employees list */
  error?: string
  /** @property Indicates whether to fetch the employees list again */
  needsRefetching?: boolean
}

export const initialState: TableState = {
  showCreateEmployeeDialog: false,
  showEditEmployeeDialog: false,
  showRemoveEmployeeDialog: false,
  loading: false,
  employees: [],
}

export enum TableActions {
  SHOW_CREATE_EMPLOYEE_DIALOG,
  CREATE_EMPLOYEE_START,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,

  SHOW_EDIT_EMPLOYEE_DIALOG,

  SHOW_REMOVE_EMPLOYEE_DIALOG,

  GET_EMPLOYEES_START,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,

  CLOSE_DIALOG,
  CLOSE_ERROR_MESSAGE,
}

export interface ShowCreateEmployeeDialogAction {
  type: TableActions.SHOW_CREATE_EMPLOYEE_DIALOG
}

export interface CreateEmployeeStartAction {
  type: TableActions.CREATE_EMPLOYEE_START
}

export interface CreateEmployeeSuccessAction {
  type: TableActions.CREATE_EMPLOYEE_SUCCESS
  /** @property New employee */
  payload: Employee
}
export interface CreateEmployeeErrorAction {
  type: TableActions.CREATE_EMPLOYEE_ERROR
  payload: string
}

export interface ShowEditEmployeeDialogAction {
  type: TableActions.SHOW_EDIT_EMPLOYEE_DIALOG
  /** @property Employee's id */
  payload: string
}

export interface ShowRemoveEmployeeDialogAction {
  type: TableActions.SHOW_REMOVE_EMPLOYEE_DIALOG
  /** @property Employee's id */
  payload: string
}

export interface CloseDialogAction {
  type: TableActions.CLOSE_DIALOG
  /** @property Whether to refetch the employees list or not */
  payload?: boolean
}

export interface GetEmployeesStartAction {
  type: TableActions.GET_EMPLOYEES_START
}

export interface GetEmployeesSuccessAction {
  type: TableActions.GET_EMPLOYEES_SUCCESS
  payload: Employee[]
}

export interface GetEmployeesErrorAction {
  type: TableActions.GET_EMPLOYEES_ERROR
  /** @property error message */
  payload: string
}

export interface CloseErrorMessageAction {
  type: TableActions.CLOSE_ERROR_MESSAGE
}

export type TableAction =
  | ShowCreateEmployeeDialogAction
  | CreateEmployeeStartAction
  | CreateEmployeeSuccessAction
  | CreateEmployeeErrorAction
  | ShowEditEmployeeDialogAction
  | ShowRemoveEmployeeDialogAction
  | CloseDialogAction
  | GetEmployeesStartAction
  | GetEmployeesSuccessAction
  | GetEmployeesErrorAction
  | CloseErrorMessageAction

export const tableReducer = (
  state = initialState,
  action: TableAction,
): TableState => {
  switch (action.type) {
    case TableActions.SHOW_CREATE_EMPLOYEE_DIALOG:
      return {
        ...state,
        showCreateEmployeeDialog: true,
      }

    case TableActions.CREATE_EMPLOYEE_START:
      return {
        ...state,
        error: undefined,
        loading: true,
      }

    case TableActions.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        loading: false,
        showCreateEmployeeDialog: false,
      }

    case TableActions.CREATE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case TableActions.SHOW_EDIT_EMPLOYEE_DIALOG:
      return {
        ...state,
        showEditEmployeeDialog: true,
        targetEmployeeId: action.payload,
      }

    case TableActions.SHOW_REMOVE_EMPLOYEE_DIALOG:
      return {
        ...state,
        showRemoveEmployeeDialog: true,
        targetEmployeeId: action.payload,
      }

    case TableActions.GET_EMPLOYEES_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      }

    case TableActions.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
        error: undefined,
      }

    case TableActions.GET_EMPLOYEES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case TableActions.CLOSE_DIALOG:
      return {
        ...state,
        needsRefetching: action.payload,
        showCreateEmployeeDialog: false,
        showEditEmployeeDialog: false,
        showRemoveEmployeeDialog: false,
        targetEmployeeId: undefined,
      }

    case TableActions.CLOSE_ERROR_MESSAGE:
      return {
        ...state,
        error: undefined,
      }

    default:
      return state
  }
}

export const showCreateEmployeeDialog = (): ShowCreateEmployeeDialogAction => ({
  type: TableActions.SHOW_CREATE_EMPLOYEE_DIALOG,
})

export const createEmployeeStart = (): CreateEmployeeStartAction => ({
  type: TableActions.CREATE_EMPLOYEE_START,
})

export const createEmployeeSuccess = (
  employee: Employee,
): CreateEmployeeSuccessAction => ({
  type: TableActions.CREATE_EMPLOYEE_SUCCESS,
  payload: employee,
})

export const createEmployeeError = (
  error: string,
): CreateEmployeeErrorAction => ({
  type: TableActions.CREATE_EMPLOYEE_ERROR,
  payload: error,
})

export const showEditEmployeeDialog = (
  id: string,
): ShowEditEmployeeDialogAction => ({
  type: TableActions.SHOW_EDIT_EMPLOYEE_DIALOG,
  payload: id,
})

export const showRemoveEmployeeDialog = (
  id: string,
): ShowRemoveEmployeeDialogAction => ({
  type: TableActions.SHOW_REMOVE_EMPLOYEE_DIALOG,
  payload: id,
})

export const getEmployeesStart = (): GetEmployeesStartAction => ({
  type: TableActions.GET_EMPLOYEES_START,
})

export const getEmployeesSuccess = (
  employees: Employee[],
): GetEmployeesSuccessAction => ({
  type: TableActions.GET_EMPLOYEES_SUCCESS,
  payload: employees,
})

export const getEmployeesError = (error: string): GetEmployeesErrorAction => ({
  type: TableActions.GET_EMPLOYEES_ERROR,
  payload: error,
})

export const closeDialog = (needsRefetching?: boolean): CloseDialogAction => ({
  type: TableActions.CLOSE_DIALOG,
  payload: needsRefetching,
})

export const closeErrorMessage = (): CloseErrorMessageAction => ({
  type: TableActions.CLOSE_ERROR_MESSAGE,
})
