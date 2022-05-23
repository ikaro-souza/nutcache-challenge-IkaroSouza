import removeEmployee from 'modules/employees/queries/removeEmployee'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useTableContext } from '../EmployeesTable/context'
import { closeDialog } from '../EmployeesTable/reducer'
import { RemoveEmployeeDialogView } from './RemoveEmployeeDialog.view'

export const RemoveEmployeeDialog: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>()
  const { state, dispatch } = useTableContext()
  const queryClient = useQueryClient()
  const { error, isLoading, isSuccess, mutate, reset } = useMutation(
    () => removeEmployee(state.targetEmployeeId!),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries()
      },
    },
  )

  React.useEffect(() => {
    if (!error) return

    const _error = error as any
    const responseMessage = _error.response?.data?.message

    setErrorMessage(
      (typeof responseMessage === 'string'
        ? responseMessage
        : responseMessage.join(', ')) ??
        _error.response?.message ??
        _error?.message,
    )
  }, [error])

  React.useEffect(() => {
    if (isSuccess) onClose(true)
  }, [isSuccess])

  const onClose = (needsRefetching?: boolean) => {
    dispatch(closeDialog(needsRefetching))
    reset()
  }

  const onRemoveClick = () => {
    mutate()
  }

  return (
    <RemoveEmployeeDialogView
      error={errorMessage}
      loading={isLoading}
      open={state.showRemoveEmployeeDialog}
      onClose={onClose}
      onRemoveClick={onRemoveClick}
    />
  )
}
