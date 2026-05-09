import type { Skill } from '../types'

export const skills: Skill[] = [
  { name: 'TypeScript', icon: 'TS',  level: 'familiar',       group: 'Languages' },
  { name: 'JavaScript', icon: 'JS',  level: 'proficient',       group: 'Languages' },
  { name: 'Python',     icon: '🐍',  level: 'core', group: 'Languages' },
  { name: 'Java',       icon: '☕️',  level: 'core', group: 'Languages' },
  { name: 'CPP',       icon: 'CP',  level: 'proficient', group: 'Languages' },
  { name: 'React',      icon: '⚛',  level: 'proficient',       group: 'Frontend'  },
  { name: 'Next.js',    icon: 'N',   level: 'proficient',       group: 'Frontend'  },
  { name: 'Tailwind',   icon: '🌬', level: 'proficient',       group: 'Frontend'  },
  { name: 'Vite',       icon: '⚡',  level: 'proficient',       group: 'Frontend'  },
  { name: 'Node.js',    icon: '⬢',  level: 'proficient',       group: 'Backend'   },
  { name: 'Express',    icon: 'EX',  level: 'proficient', group: 'Backend'   },
  { name: 'Docker',     icon: '🐳',  level: 'proficient', group: 'Tools'     },
  { name: 'Git',        icon: '⎇',  level: 'core',       group: 'Tools'     },
  { name: 'GitHub',  icon: 'GH',  level: 'proficient', group: 'Tools'     },
  { name: 'AWS',        icon: '☁',  level: 'familiar',   group: 'Tools'     },
  { name: 'Vim',        icon: 'VI',  level: 'proficient', group: 'Tools'     },
  { name: 'Linux',      icon: '🐧',  level: 'core', group: 'Tools'     },
]
