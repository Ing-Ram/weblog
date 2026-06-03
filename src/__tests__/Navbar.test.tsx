import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Navbar from '../components/layout/Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar – desktop links', () => {
  it('renders the logo linking to home', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: 'CI' })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders all nav links with correct destinations', () => {
    renderNavbar()
    const home = screen.getAllByRole('link', { name: 'Home' })[0]
    const about = screen.getAllByRole('link', { name: 'About' })[0]
    const projects = screen.getAllByRole('link', { name: 'Projects' })[0]
    const blog = screen.getAllByRole('link', { name: 'Blog' })[0]

    expect(home).toHaveAttribute('href', '/')
    expect(about).toHaveAttribute('href', '/about')
    expect(projects).toHaveAttribute('href', '/projects')
    // Blog URL comes from VITE_BLOG_URL env — assert it is a real URL, not the fallback '#'
    expect(blog).toHaveAttribute('href', 'https://yappinblog.netlify.app')
  })
})

describe('Navbar – mobile hamburger', () => {
  it('toggles mobile menu open and closed', async () => {
    renderNavbar()
    const user = userEvent.setup()

    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(toggle).toBeInTheDocument()

    // Mobile menu not visible initially
    expect(screen.queryByRole('link', { name: 'Home', hidden: false })).toBeInTheDocument()

    await user.click(toggle)

    // After clicking, mobile dropdown renders additional links
    const allHomeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(allHomeLinks.length).toBeGreaterThanOrEqual(2)

    await user.click(toggle)
    const homeLinksAfterClose = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinksAfterClose.length).toBe(1)
  })
})
