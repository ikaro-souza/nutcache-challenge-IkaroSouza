import React from 'react'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: string
}

const baseClassName =
  'appearance-none bg-teal-400 duration-75 ease-in-out font-medium grid gap-x-2 grid-flow-col items-center justify-center px-3 py-2 right-4 rounded text-center text-sm text-teal-50 transition-all w-auto '

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  icon,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={className ? `${baseClassName} ${className}` : baseClassName}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </button>
  )
}
