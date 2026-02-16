import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  padding = 'md',
  style
}, ref) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div 
      ref={ref}
      className={`
        bg-gray-800 rounded-xl shadow-lg border border-gray-700
        ${paddingStyles[padding]}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

