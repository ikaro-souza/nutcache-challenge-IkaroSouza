import { IconButton } from 'modules/common'
import { Employee } from 'modules/employees/models'
import React from 'react'
import { TableCell } from '../TableCell'
import { TableRow } from '../TableRow'
import { mapEmployeeToRow } from '../_utils'

interface TableBodyViewProps {
  employees: Employee[]
  error?: string
  loading: boolean
  onEditEmployeeClick: (employeeId: string) => void
  onRemoveEmployeeClick: (employeeId: string) => void
}

export const TableBodyView: React.FC<TableBodyViewProps> = ({
  employees,
  error,
  loading,
  onEditEmployeeClick,
  onRemoveEmployeeClick,
}) => {
  const rows = React.useMemo(() => {
    if (employees.length === 0)
      return (
        <TableRow className="last:border-b-0">
          <TableCell colSpan={100}>
            There are no employees registered.
          </TableCell>
        </TableRow>
      )

    return employees?.map(mapEmployeeToRow).map((r, index) => (
      <TableRow key={r.cpf} className="last:border-b-0">
        <TableCell>{r.name}</TableCell>
        <TableCell>{r.birthDate}</TableCell>
        <TableCell>{r.gender}</TableCell>
        <TableCell>{r.email}</TableCell>
        <TableCell>{r.cpf}</TableCell>
        <TableCell>{r.startDate}</TableCell>
        <TableCell>{r.team}</TableCell>
        <TableCell>
          <div className="flex items-center">
            <IconButton
              onClick={() => onEditEmployeeClick(employees[index].id)}
            >
              edit
            </IconButton>
            <IconButton
              className="text-red-500"
              onClick={() => onRemoveEmployeeClick(employees[index].id)}
            >
              delete
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
    ))
  }, [employees])

  return (
    <tbody>
      {loading && (
        <TableRow className="last:border-b-0">
          <TableCell colSpan={100}>loading...</TableCell>
        </TableRow>
      )}
      {error && (
        <TableRow className="last:border-b-0">
          <TableCell colSpan={100}>
            Something went wrong and we could not get the employees records
          </TableCell>
        </TableRow>
      )}
      {!loading && !error && rows}
    </tbody>
  )
}
