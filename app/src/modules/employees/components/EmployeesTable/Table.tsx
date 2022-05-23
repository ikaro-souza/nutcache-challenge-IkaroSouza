import React from 'react'
import { EmployeeDialog } from '../EmployeeDialog'
import { RemoveEmployeeDialog } from '../RemoveEmployeeDialog'
import { TableProvider } from './context'
import { TableBody } from './TableBody'
import { TableFooter } from './TableFooter'
import { TableHead } from './TableHead'

export const Table: React.FC = () => {
  return (
    <TableProvider>
      <div className="border max-h-116 mx-auto overflow-x-auto rounded-lg rounded-b-none md:max-w-screen-lg">
        <table className="table-auto text-sm w-full lg:text-base">
          <TableHead />
          <TableBody />
        </table>
      </div>
      <div className="border border-t-0 mx-auto rounded-lg rounded-t-none md:max-w-screen-lg">
        <TableFooter />
      </div>

      <EmployeeDialog />
      <RemoveEmployeeDialog />
    </TableProvider>
  )
}
