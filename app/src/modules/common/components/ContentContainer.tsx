import React from 'react'

interface ContentContainerProps {
  className?: string
}

const baseClassName = 'container mx-auto px-4 md:px-8'

export const ContentContainer: React.FC<
  React.PropsWithChildren<ContentContainerProps>
> = ({ children, className }) => {
  return (
    <div
      className={className ? `${baseClassName} ${className}` : baseClassName}
    >
      {children}
    </div>
  )
}
