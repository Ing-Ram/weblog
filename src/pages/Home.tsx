import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import SnakeGame from '../components/ui/SnakeGame'
import GameModal from '../components/ui/GameModal'

const marqueeItems = [
  'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Vite', 'Next.js',
  'Tailwind', 'MySql', 'Java', 'Python', 'AWS', 'Git', 'Figma', 'Linux', 'C++', 'Swift', 'JavaFX', 'SwiftUI', 'GraphQL', 'REST APIs', 'Microservices', 'TDD', 'C#',
]

export default function Home() {
  const [gameOpen, setGameOpen] = useState(false)
  return (
    <div className="pt-header">
      {/* Hero */}
      <section className="min-h-[calc(100vh-theme(spacing.header))] flex items-center bg-surface-950 border-b border-surface-700">
        <div className="section-container w-full animate-fade-up">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 border border-surface-700 px-3 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="label-mono text-text-secondary">Available for Work</span>
          </div>

          <p className="font-mono text-text-muted text-xs uppercase tracking-label mb-4">
            Hi, I&apos;m
          </p>

          <h1 className="font-display font-bold text-text-primary uppercase mb-10"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 8rem)', lineHeight: '0.88', letterSpacing: '-0.045em' }}>
            Chad{' '}
            <br />
            Ingram
          </h1>

          <div className="border-t border-surface-700 pt-6 max-w-2xl">
            <p className="font-mono text-text-primary text-sm uppercase tracking-label mb-5">
              Developer &amp; Creative Technologist
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-10">
              I build performant, delightful products — from silly projects for my family to battle-tested APIs.
              Focused on shipping things that matter.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Button href="/projects" variant="primary" size="lg">
                View Projects
              </Button>
              <Button href="/about" variant="outline" size="lg">
                About Me
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex">
            <div className="flex items-center gap-3 text-text-muted">
              <span className="font-mono text-[0.7rem] uppercase tracking-label">Scroll</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="py-5 border-b border-surface-700 bg-surface-950 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono text-text-muted text-xs uppercase tracking-label mx-6">
              {item}
              <span className="ml-6 text-accent">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* Snake Game Easter Egg */}
      <section className="border-b border-surface-700 bg-surface-950">
        <div className="section-container py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="label-mono text-text-muted">Feeling playful?</p>
          <button
            onClick={() => setGameOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-surface-700 text-text-primary
              font-mono text-sm uppercase tracking-label
              hover:border-accent hover:text-accent transition-colors duration-150 self-start"
          >
            <span>🐍</span>
            Play Snake
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-surface-950">
        <div className="section-container">
          <h2 className="font-display font-bold text-text-primary uppercase mb-8 max-w-3xl"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 4rem)', lineHeight: '0.95', letterSpacing: '-0.04em' }}>
            Want to see what I've built?
          </h2>
          <p className="text-text-secondary mb-10 max-w-md leading-relaxed">
            From dashboards to CLIs to mobile apps — explore the full project catalogue.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 border border-accent text-accent
              font-mono text-sm uppercase tracking-label px-6 py-3
              hover:bg-accent hover:text-surface-950 transition-colors duration-150 group"
          >
            See all projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </section>

      <GameModal isOpen={gameOpen} onClose={() => setGameOpen(false)}>
        <SnakeGame onClose={() => setGameOpen(false)} />
      </GameModal>
    </div>
  )
}
