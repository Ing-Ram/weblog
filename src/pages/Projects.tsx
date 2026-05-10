import { useState } from 'react'
import ProjectCard from '../components/ui/ProjectCard'
import { projects } from '../data/projects'
import type { Project } from '../types'

type Filter = 'All' | Project['category']
const filters: Filter[] = ['All', 'Web', 'Mobile', 'Other', 'OSS']

export default function Projects() {
  const [active, setActive] = useState<Filter>('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="pt-16">
      <div className="section-container">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="font-display font-bold text-text-primary mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
            Projects
          </h1>
          <div className="w-30 h-1 bg-gradient-accent rounded-full mb-4" />
          <p className="text-text-secondary text-lg">Things I've built.</p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                active === filter
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'text-text-secondary hover:text-text-primary border border-transparent hover:border-surface-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
