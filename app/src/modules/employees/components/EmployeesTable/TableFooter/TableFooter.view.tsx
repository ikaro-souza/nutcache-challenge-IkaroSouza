import { Button } from 'modules/common'
import React from 'react'

interface TableFooterViewProps {
  onAddEmployeeClick: VoidFunction
}

export const TableFooterView: React.FC<TableFooterViewProps> = ({
  onAddEmployeeClick,
}) => {
  return (
    <div className="flex justify-end p-4">
      <Button className="ml-auto" icon="add" onClick={onAddEmployeeClick}>
        Add an employee
      </Button>
    </div>
  )
}
