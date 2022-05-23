import React from 'react'

interface IconButtonProps {
  className?: string
  onClick?: VoidFunction
}

export const IconButton: React.FC<React.PropsWithChildren<IconButtonProps>> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={`appearance-none justify-center h-10 inline-flex items-center material-symbols-outlined text-2xl w-10 ${
        className ?? ''
      }`}
      aria-label={children as string}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
