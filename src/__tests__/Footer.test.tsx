import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Footer from '../components/layout/Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

describe('Footer – quick links', () => {
  it('renders all internal navigation links', () => {
    renderFooter()
    const home = screen.getByRole('link', { name: 'Home' })
    const about = screen.getByRole('link', { name: 'About' })
    const projects = screen.getByRole('link', { name: 'Projects' })

    expect(home).toHaveAttribute('href', '/')
    expect(about).toHaveAttribute('href', '/about')
    expect(projects).toHaveAttribute('href', '/projects')
  })
})

describe('Footer – social links', () => {
  it('renders GitHub link pointing to the correct profile', () => {
    renderFooter()
    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', 'https://github.com/Ing-Ram')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders LinkedIn link pointing to the correct profile', () => {
    renderFooter()
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/chad-ingram')
    expect(linkedin).toHaveAttribute('target', '_blank')
  })

  it('renders Email link with mailto address', () => {
    renderFooter()
    const email = screen.getByRole('link', { name: /email/i })
    expect(email).toHaveAttribute('href', 'mailto:chad117gram@gmail.com')
    // mailto links should NOT open in a new tab
    expect(email).not.toHaveAttribute('target', '_blank')
  })
})

describe('Footer – content', () => {
  it('renders the tagline with correct grammar', () => {
    renderFooter()
    expect(
      screen.getByText('Full-Stack Developer building thoughtful products with clean code.'),
    ).toBeInTheDocument()
  })

  it('renders the built-with line', () => {
    renderFooter()
    expect(screen.getByText('Built with React + Tailwind')).toBeInTheDocument()
  })
})
