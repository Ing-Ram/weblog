interface TagProps {
  label: string
  variant?: 'tech' | 'category' | 'default'
}

const variantClasses = {
  tech: 'border border-accent/30 text-accent bg-accent/5 font-mono text-xs',
  category: 'border border-accent text-accent text-xs',
  default: 'border border-surface-700 text-text-secondary bg-surface-800 text-xs',
}

export default function Tag({ label, variant = 'default' }: TagProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 font-mono ${variantClasses[variant]}`}>
      {label}
    </span>
  )
}
