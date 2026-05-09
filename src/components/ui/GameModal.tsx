import { ReactNode } from 'react'

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function GameModal({ isOpen, onClose, children }: GameModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-surface-900 border border-surface-700 rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
