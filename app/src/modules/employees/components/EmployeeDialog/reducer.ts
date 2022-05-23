import { maskCpf } from 'modules/common/masks'
import { Gender, Team } from 'modules/employees/models'
import moment from 'moment'

export interface EmployeeDialogForm {
  birthDate?: Date
  cpf: string
  email: string
  gender?: Gender
  name: string
  startDate?: Date
  team?: Team
}

export interface EmployeeDialogState {
  form: EmployeeDialogForm
  error?: string
}

// CPF, email and name are initialized to avoid a warning about uncontrolled inputs
export const initialState: EmployeeDialogState = {
  form: {
    cpf: '',
    email: '',
    name: '',
    birthDate: undefined,
    gender: undefined,
    startDate: undefined,
    team: undefined,
  },
}

export enum EmployeeDialogFormActions {
  INITIALIZE_FROM_EMPLOYEE,
  SET_BIRTH_DATE,
  SET_CPF,
  SET_EMAIL,
  SET_GENDER,
  SET_NAME,
  SET_START_DATE,
  SET_TEAM,
  RESET,

  SEND_REQUEST_ERROR,
}

export interface EmployeeFormAction {
  type: EmployeeDialogFormActions
  payload?: any
}

export const reducer = (
  state: EmployeeDialogState,
  action: EmployeeFormAction,
): EmployeeDialogState => {
  switch (action.type) {
    case EmployeeDialogFormActions.INITIALIZE_FROM_EMPLOYEE:
      return {
        ...state,
        form: action.payload,
      }

    case EmployeeDialogFormActions.SET_BIRTH_DATE:
      return {
        ...state,
        form: {
          ...state.form,
          birthDate: moment(action.payload).toDate(),
        },
      }

    case EmployeeDialogFormActions.SET_CPF:
      return {
        ...state,
        form: {
          ...state.form,
          cpf: maskCpf(action.payload),
        },
      }

    case EmployeeDialogFormActions.SET_EMAIL:
      return {
        ...state,
        form: {
          ...state.form,
          email: action.payload,
        },
      }

    case EmployeeDialogFormActions.SET_GENDER:
      return {
        ...state,
        /** It needs to be converted to a number so it can be accepted by the API */
        form: {
          ...state.form,
          gender: action.payload ? Number(action.payload) : undefined,
        },
      }

    case EmployeeDialogFormActions.SET_NAME:
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload,
        },
      }

    case EmployeeDialogFormActions.SET_START_DATE:
      return {
        ...state,
        form: {
          ...state.form,
          startDate: moment(action.payload).toDate(),
        },
      }

    case EmployeeDialogFormActions.SET_TEAM:
      return {
        ...state,
        /** It needs to be converted to a number so it can be accepted by the API */
        form: {
          ...state.form,
          team: action.payload === '' ? undefined : Number(action.payload),
        },
      }

    case EmployeeDialogFormActions.RESET:
      return { ...initialState }

    case EmployeeDialogFormActions.SEND_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
