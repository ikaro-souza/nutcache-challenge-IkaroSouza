import React from 'react'

interface TableRowProps {
  className?: string
}

const defaultClassName = 'h-10 border-b'

export const TableRow: React.FC<React.PropsWithChildren<TableRowProps>> = ({
  children,
  className,
}) => {
  return (
    <tr
      className={
        className ? `${defaultClassName} ${className}` : defaultClassName
      }
    >
      {children}
    </tr>
  )
}
