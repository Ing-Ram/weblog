# Chad Ingram — Portfolio Website

A personal portfolio website showcasing projects, skills, and background. Built with modern web technologies for performance and developer experience.

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript for type safety
- **Build Tool:** Vite for fast HMR and optimized production builds
- **Styling:** Tailwind CSS v3 with custom color tokens (dark theme with cyan/magenta accents)
- **Routing:** React Router v6 for client-side SPA navigation
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (code)

## Project Structure

```
src/
├── pages/              # Route-level components (Home, About, Projects)
├── components/
│   ├── layout/        # Navbar, Footer (appear on all pages)
│   └── ui/            # Reusable atoms (Button, Tag, ProjectCard, SkillBadge)
├── data/              # projects.ts, skills.ts (placeholder content)
├── types/             # TypeScript interfaces
└── App.tsx            # Router setup
```

## Getting Started

```bash
npm install
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
```

## Testing

Tests are written with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).

```bash
npm test             # Run all tests once
npm run test:watch   # Run tests in watch mode
```

**Coverage:**
- `Navbar` — logo link, nav links (Home, About, Projects, Blog), mobile hamburger toggle
- `Footer` — quick links, social links (GitHub, LinkedIn, Email) with correct hrefs
- `Home` — hero buttons, CTA link, Play Snake button, key text/grammar
- `Projects` — filter buttons (All, Web, Mobile, Other, OSS), filter behavior, GitHub links on cards
- `ProjectCard` — renders title/description/tags, GitHub button, Live Demo button

Test files live in `src/__tests__/` with a shared setup at `src/test/setup.ts`.

## Deployment

Deploy to Netlify for automatic CI/CD:
1. Push to GitHub (already done)
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

For SPA routing on Netlify, add `public/_redirects`:
```
/* /index.html 200
```

## Design System

**Colors:**
- Background: `#080B12` (near-black)
- Accent: `#00D9FF` (cyan)
- Secondary: `#FF2D78` (magenta)
- Text: `#F0F6FC` (near-white)

**Components:**
- `.card-base` — reusable card styling with hover effects
- `.gradient-text` — gradient accent on text
- `.section-container` — max-width container with padding
