import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]

const blogUrl = import.meta.env.VITE_BLOG_URL ?? '#'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-950/80 backdrop-blur-md border-b border-surface-700">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display font-bold text-xl gradient-text tracking-tight">
          CI
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-body text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href={blogUrl}
              className="font-body text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Blog
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <AnnouncementBar />

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-surface-900 border-t border-surface-700 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block font-body font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={blogUrl}
                className="block font-body font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
