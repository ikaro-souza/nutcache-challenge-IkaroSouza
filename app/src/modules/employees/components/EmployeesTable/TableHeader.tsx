import React from 'react'

interface TableHeaderProps {
  alignRight?: boolean
  'aria-label'?: string
}

export const TableHeader: React.FC<
  React.PropsWithChildren<TableHeaderProps>
> = ({ alignRight, children, ...rest }) => {
  return (
    <th className="py-2 px-4 h-12 whitespace-nowrap" {...rest}>
      {children}
    </th>
  )
}
