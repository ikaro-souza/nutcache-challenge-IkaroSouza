import React from 'react'
import { useTableContext } from '../context'
import { showEditEmployeeDialog, showRemoveEmployeeDialog } from '../reducer'
import { TableBodyView } from './TableBody.view'

export const TableBody: React.FC = () => {
  const { state, dispatch } = useTableContext()

  const onEditEmployeeClick = (employeeId: string) => {
    dispatch(showEditEmployeeDialog(employeeId))
  }

  const onRemoveEmployeeClick = (employeeId: string) => {
    dispatch(showRemoveEmployeeDialog(employeeId))
  }

  return (
    <TableBodyView
      employees={state.employees}
      loading={state.loading}
      error={state.error}
      onEditEmployeeClick={onEditEmployeeClick}
      onRemoveEmployeeClick={onRemoveEmployeeClick}
    />
  )
}
