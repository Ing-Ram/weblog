import type { Skill } from '../../types'

const levelColors = {
  core: 'text-accent',
  proficient: 'text-text-primary',
  familiar: 'text-text-secondary',
}

export default function SkillBadge({ name, icon, level = 'proficient' }: Skill) {
  return (
    <div className="card-base p-4 flex items-center gap-3">
      <span className={`font-mono font-bold text-sm w-8 shrink-0 ${levelColors[level]}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-text-primary text-sm font-medium truncate">{name}</p>
        <p className={`text-xs capitalize ${levelColors[level]}`}>{level}</p>
      </div>
    </div>
  )
}
