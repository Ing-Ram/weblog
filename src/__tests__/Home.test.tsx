import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home – hero buttons', () => {
  it('renders "View Projects" button linking to /projects', () => {
    renderHome()
    const btn = screen.getByRole('link', { name: /view projects/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('href', '/projects')
  })

  it('renders "About Me" button linking to /about', () => {
    renderHome()
    const btn = screen.getByRole('link', { name: /about me/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('href', '/about')
  })
})

describe('Home – CTA section', () => {
  it('renders "See all projects" link to /projects', () => {
    renderHome()
    const link = screen.getByRole('link', { name: /see all projects/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/projects')
  })
})

describe('Home – Play Snake button', () => {
  it('renders the snake game button', () => {
    renderHome()
    const btn = screen.getByRole('button', { name: /play snake/i })
    expect(btn).toBeInTheDocument()
  })

  it('opens the game modal when clicked', async () => {
    renderHome()
    const user = userEvent.setup()
    const btn = screen.getByRole('button', { name: /play snake/i })
    await user.click(btn)
    // The game canvas or close button should now be visible
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })
})

describe('Home – grammar & text content', () => {
  it('renders the correct hero headline', () => {
    renderHome()
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
    expect(screen.getByText('Chad Ingram')).toBeInTheDocument()
  })

  it('renders hero sub-heading with correct text', () => {
    renderHome()
    expect(screen.getByText('Developer & Creative Technologist')).toBeInTheDocument()
  })

  it('renders hero description with em-dash (no missing spaces)', () => {
    renderHome()
    expect(
      screen.getByText(
        /I build performant, delightful products — from silly projects for my family to battle-tested APIs\./,
      ),
    ).toBeInTheDocument()
  })

  it('renders the availability badge', () => {
    renderHome()
    expect(screen.getByText('Available for Work')).toBeInTheDocument()
  })

  it('renders the CTA heading with correct punctuation', () => {
    renderHome()
    expect(screen.getByText("Want to see what I've built?")).toBeInTheDocument()
  })

  it('renders the CTA sub-text with correct grammar', () => {
    renderHome()
    expect(
      screen.getByText(
        /From dashboards to CLIs to mobile apps — explore the full project catalogue\./,
      ),
    ).toBeInTheDocument()
  })
})
