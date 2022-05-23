import React from 'react'
import { useTableContext } from '../context'
import { showCreateEmployeeDialog } from '../reducer'
import { TableFooterView } from './TableFooter.view'

export const TableFooter: React.FC = () => {
  const { dispatch } = useTableContext()

  const onAddEmployeeClick = () => {
    dispatch(showCreateEmployeeDialog())
  }
  return <TableFooterView onAddEmployeeClick={onAddEmployeeClick} />
}
