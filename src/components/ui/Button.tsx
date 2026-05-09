import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  className?: string
}

const variantClasses = {
  primary: 'bg-accent text-surface-950 font-semibold hover:bg-accent-dim',
  outline: 'border border-accent text-accent hover:bg-accent/10',
  ghost: 'text-text-secondary hover:text-accent',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 font-body transition-all duration-200
    hover:scale-105 active:scale-95 cursor-pointer
    ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={base}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  )
}
