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
  primary: 'bg-accent text-surface-950 font-bold hover:bg-text-primary',
  outline: 'border border-surface-700 text-text-primary hover:border-accent hover:text-accent',
  ghost: 'text-text-secondary hover:text-accent',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-[0.7rem]',
  md: 'px-5 py-2.5 text-xs',
  lg: 'px-7 py-3.5 text-sm',
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
  const base = `inline-flex items-center gap-2 font-mono uppercase tracking-label
    transition-colors duration-150 cursor-pointer
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
