import createEmployee from 'modules/employees/queries/createEmployee'
import updateEmployee from 'modules/employees/queries/updateEmployee'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useTableContext } from '../EmployeesTable/context'
import { closeDialog } from '../EmployeesTable/reducer'
import { EmployeeDialogView } from './EmployeeDialog.view'
import { EmployeeDialogFormActions, initialState, reducer } from './reducer'

const queryOptions = {
  retry: false,
}

export const EmployeeDialog: React.FC = () => {
  const [state, dispatchState] = React.useReducer(reducer, initialState)
  const { state: context, dispatch } = useTableContext()
  const {
    employees,
    targetEmployeeId,
    showCreateEmployeeDialog,
    showEditEmployeeDialog,
  } = context
  const queryClient = useQueryClient()

  const createQuery = useMutation(createEmployee, {
    ...queryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const updateQuery = useMutation(updateEmployee, {
    ...queryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  React.useEffect(() => {
    if (!targetEmployeeId) return

    const employee = employees.find((x) => x.id === targetEmployeeId)
    dispatchState({
      type: EmployeeDialogFormActions.INITIALIZE_FROM_EMPLOYEE,
      payload: employee,
    })
  }, [targetEmployeeId])

  React.useEffect(() => {
    if (createQuery.error || updateQuery.error) {
      const _error = (createQuery.error ?? updateQuery.error) as any

      let responseMessage = _error.response?.data?.message
      // api request validation message
      if (responseMessage && typeof responseMessage !== 'string')
        responseMessage = responseMessage.join(', ')
      // axios message
      else responseMessage = _error.response?.message

      dispatchState({
        type: EmployeeDialogFormActions.SEND_REQUEST_ERROR,
        payload: responseMessage ?? _error?.message,
      })
    } else if (createQuery.isSuccess || updateQuery.isSuccess) {
      onClose(true)
    }
  }, [createQuery, updateQuery])

  const onBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_BIRTH_DATE,
      payload: e.target.value,
    })
  }

  const onCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_CPF,
      payload: e.target.value,
    })
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_EMAIL,
      payload: e.target.value,
    })
  }

  const onGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_GENDER,
      payload: e.target.value,
    })
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_NAME,
      payload: e.target.value,
    })
  }

  const onTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_TEAM,
      payload: e.target.value,
    })
  }

  const onStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchState({
      type: EmployeeDialogFormActions.SET_START_DATE,
      payload: e.target.value,
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showCreateEmployeeDialog) createQuery.mutate(state.form)
    else if (showEditEmployeeDialog) updateQuery.mutate(state.form)
  }

  const onClose = (needsRefetching?: boolean) => {
    dispatch(closeDialog(needsRefetching))
    createQuery.reset()
    updateQuery.reset()
    dispatchState({
      type: EmployeeDialogFormActions.RESET,
    })
  }

  return (
    <EmployeeDialogView
      edit={showEditEmployeeDialog}
      error={state.error}
      formData={state.form}
      loading={createQuery.isLoading || updateQuery.isLoading}
      open={showCreateEmployeeDialog || showEditEmployeeDialog}
      onBirthDateChange={onBirthDateChange}
      onCpfChange={onCpfChange}
      onClose={onClose}
      onSubmit={onSubmit}
      onEmailChange={onEmailChange}
      onGenderChange={onGenderChange}
      onNameChange={onNameChange}
      onTeamChange={onTeamChange}
      onStartDateChange={onStartDateChange}
    />
  )
}
