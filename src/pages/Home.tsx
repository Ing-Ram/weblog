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
    <div className="pt-16">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden
        bg-hero-grid bg-hero-grid bg-surface-950">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="section-container text-center relative z-10 animate-fade-up">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 border border-surface-700 bg-surface-900 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-text-secondary text-xs font-mono">Available for Work</span>
          </div>

          <h1 className="font-display font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
            Hi, I'm{' '}
            <span className="gradient-text">Chad Ingram</span>
          </h1>

          <p className="text-text-secondary text-xl font-body mb-6 max-w-xl mx-auto">
            Developer & Creative Technologist
          </p>

          <p className="text-text-muted text-base max-w-lg mx-auto mb-8 leading-relaxed">
            I build performant, delightful products-from silly projects for my family to battle-tested APIs.
            Focused on shipping things that matter.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button href="/projects" variant="primary" size="lg">
              View Projects
            </Button>
            <Button href="/about" variant="outline" size="lg">
              About Me
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex justify-center">
            <div className="flex flex-col items-center gap-1 text-text-muted animate-bounce">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="py-8 border-y border-surface-700 bg-surface-900 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono text-text-muted text-sm mx-8">
              {item}
              <span className="ml-8 text-accent/30">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* Snake Game Easter Egg */}
      <section className="py-16 bg-surface-900 border-b border-surface-700">
        <div className="section-container text-center">
          <p className="text-text-muted text-sm mb-4 font-mono">feeling playful?</p>
          <button
            onClick={() => setGameOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent
              hover:border-accent hover:bg-accent/5 rounded-lg transition-all duration-200 font-body"
          >
            <span>🐍</span>
            Play Snake
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-pop/10 pointer-events-none" />
        <div className="section-container text-center relative z-10">
          <h2 className="font-display font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Want to see what I've built?
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            From dashboards to CLIs to mobile apps — explore the full project catalogue.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-body font-semibold text-accent
              hover:text-text-primary transition-colors duration-200 group"
          >
            See all projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
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
