import React from 'react'

interface TableCellProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {}

const baseClassName = 'h-10 px-4 text-center whitespace-nowrap'

export const TableCell: React.FC<React.PropsWithChildren<TableCellProps>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <td
      className={className ? `${baseClassName} ${className}` : baseClassName}
      {...rest}
    >
      {children}
    </td>
  )
}
