export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: 'Web' | 'Mobile' | 'Other' | 'OSS'
  githubUrl?: string
  liveUrl?: string
  gradient: string
}

export interface Skill {
  name: string
  icon: string
  level: 'core' | 'proficient' | 'familiar'
  group: 'Languages' | 'Frontend' | 'Backend' | 'Tools' | 'Frameworks'
}
