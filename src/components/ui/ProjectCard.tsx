import type { Project } from '../../types'
import Tag from './Tag'
import Button from './Button'

export default function ProjectCard({ title, description, tags, category, githubUrl, liveUrl, gradient }: Project) {
  return (
    <div className="card-base flex flex-col overflow-hidden">
      {/* Gradient header */}
      <div className={`relative h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-white/20 font-display font-bold text-5xl select-none">
          {title.charAt(0)}
        </span>
        <div className="absolute top-3 right-3">
          <Tag label={category} variant="default" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-display font-semibold text-text-primary text-lg mb-1.5">{title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} variant="tech" />
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center gap-2 mt-auto">
          {githubUrl && (
            <Button href={githubUrl} variant="outline" size="sm" external>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </Button>
          )}
          {liveUrl && (
            <Button href={liveUrl} variant="primary" size="sm" external>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
