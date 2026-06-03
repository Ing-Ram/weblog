import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ProjectCard from '../components/ui/ProjectCard'
import type { Project } from '../types'

const base: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description.',
  tags: ['React', 'TypeScript'],
  category: 'Web',
  gradient: 'from-blue-500 to-indigo-600',
}

function renderCard(props: Partial<Project> = {}) {
  const merged = { ...base, ...props }
  return render(
    <MemoryRouter>
      <ProjectCard {...merged} />
    </MemoryRouter>,
  )
}

describe('ProjectCard – content', () => {
  it('renders the project title', () => {
    renderCard()
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders the project description', () => {
    renderCard()
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('renders all tech tags', () => {
    renderCard()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders the category tag', () => {
    renderCard()
    expect(screen.getByText('Web')).toBeInTheDocument()
  })
})

describe('ProjectCard – GitHub button', () => {
  it('renders GitHub button when githubUrl is provided', () => {
    renderCard({ githubUrl: 'https://github.com/test/repo' })
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not render GitHub button when githubUrl is absent', () => {
    renderCard({ githubUrl: undefined })
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
  })
})

describe('ProjectCard – Live Demo button', () => {
  it('renders Live Demo button when liveUrl is provided', () => {
    renderCard({ liveUrl: 'https://example.com' })
    const link = screen.getByRole('link', { name: /live demo/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('does not render Live Demo button when liveUrl is absent', () => {
    renderCard({ liveUrl: undefined })
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
  })

  it('renders both buttons when both URLs are provided', () => {
    renderCard({
      githubUrl: 'https://github.com/test/repo',
      liveUrl: 'https://example.com',
    })
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /live demo/i })).toBeInTheDocument()
  })
})
