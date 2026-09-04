import { useState } from 'react'
import SkillBadge from '../components/ui/SkillBadge'
import SnakeGame from '../components/ui/SnakeGame'
import GameModal from '../components/ui/GameModal'
import { skills } from '../data/skills'
import type { Skill } from '../types'

const groups: Skill['group'][] = ['Languages', 'Frontend', 'Backend', 'Tools', 'Frameworks']

const timeline = [
  {
    year: '2026',
    title: 'Founder of GGyst.com',
    description: 'Founded and shipped GGyst, a business-management platform for independent gig workers that brings scheduling, client and family profiles, invoicing, expenses, and dashboard reporting into one place. Built it end to end — data model, authentication, encrypted client records, and the production deploy.',
  },
  {
    year: '2024',
    title: 'Music Director',
    description: 'Took a year-long sabbatical from software engineering to be a full-time Music Director for the Salvation Army. It was an incredible experience that deepened my love for music, collaboration, and building community.',
  },
  {
    year: '2022',
    title: 'Software Engineer I',
    description: 'Started working for a fintech company building APIs, internal tools, inbound support, and more. Gained experience across the stack and shipped features that impacted millions of users across many banks.',
  },
  {
    year: '2021',
    title: 'Graduated from University',
    description: 'Worked with CodePath to learn, and then teach Android development. I also graduated on the dean\'s list and continued to develop a deep passion for software development, problem-solving, and continuous learning.',
  },
  {
    year: '2017',
    title: 'Started Coding Seriously',
    description: 'Built my first app for a class project, and I never looked back.',
  },
]

export default function About() {
  const [avatarClicks, setAvatarClicks] = useState(0)
  const [gameOpen, setGameOpen] = useState(false)

  const handleAvatarClick = () => {
    const newClicks = avatarClicks + 1
    setAvatarClicks(newClicks)
    if (newClicks === 3) {
      setGameOpen(true)
      setAvatarClicks(0)
    }
  }

  return (
    <div className="pt-header">
      <div className="section-container">
        {/* Page header */}
        <div className="mb-20 border-b border-surface-700 pb-10">
          <p className="label-mono mb-5">01 / Profile</p>
          <h1 className="font-display font-bold text-text-primary uppercase"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)', lineHeight: '0.9', letterSpacing: '-0.045em' }}>
            About Me
          </h1>
        </div>

        {/* Bio section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start md:sticky md:top-28">
            <div
              onClick={handleAvatarClick}
              className="w-full max-w-[300px] md:max-w-[380px] aspect-square border border-surface-700 cursor-pointer relative group
                transition-shadow duration-150 hover:shadow-hard-sm"
            >
              <img src="/chad.jpg" alt="Chad Ingram" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-200" />
              {avatarClicks > 0 && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-2xl">{3 - avatarClicks}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-5 text-text-secondary leading-relaxed border-l border-surface-700 pl-6">
            <p>
              Hi, I’m Chad!
            </p>
            <p>
              A husband, father, software engineer, musician, and lifelong learner who believes the most meaningful things we build are the ones that connect people.
            </p>
            <p>
              Fatherhood is at the center of who I am. It’s now shaped the way I work, create, problem-solve, and ultimately, how I approach life.  Being a dad has taught me patience, adaptability, curiosity, and the importance of building things that truly matter - whether that’s supporting my family, creating software, or making music with others.
            </p>
            <p>
              Professionally, I enjoy developing software solutions that simplify problems, improve experiences, and empower creativity. I’m especially drawn to projects where education, technology, and creativity intersect - the kind of work that feels both practical and human.
            </p>
            <p>
              Outside of engineering, music has always been a huge part of my life. I play trumpet in local orchestras and value the teamwork, discipline, and emotion that live performance brings. Music and technology may seem like different worlds, but for me they’ve always shared the same foundation: listening carefully, collaborating well, and creating something meaningful.
            </p>
            <p>
              As a family, we love traveling and exploring new places together whenever we can. Some of our best memories have come from simply experiencing the world while discovering new cities, cultures, food, and moments that remind us to stay curious and connected.
            </p>
            <p>
              This website is a place where I share my projects, ideas, and experiences as I continue growing.
            </p>
          </div>
        </div>

        {/* Skills section */}
        <div className="mb-20">
          <p className="label-mono mb-4">02 / Stack</p>
          <h2 className="font-display font-bold text-text-primary uppercase text-3xl md:text-5xl mb-10 tracking-brutal">
            Skills &amp; Stack
          </h2>
          <div className="flex flex-col gap-8">
            {groups.map((group) => {
              const groupSkills = skills.filter((s) => s.group === group)
              return (
                <div key={group}>
                  <p className="label-mono mb-3 border-b border-surface-700 pb-2">{group}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {groupSkills.map((skill) => (
                      <SkillBadge key={skill.name} {...skill} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="label-mono mb-4">03 / Timeline</p>
          <h2 className="font-display font-bold text-text-primary uppercase text-3xl md:text-5xl mb-10 tracking-brutal">
            Timeline
          </h2>
          <div className="flex flex-col gap-0">
            {timeline.map((entry, i) => (
              <div key={i} className="flex gap-6 relative">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-accent mt-1.5 shrink-0" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-surface-700 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-12 max-w-2xl">
                  <p className="font-mono font-bold text-accent text-sm tracking-label mb-2">{entry.year}</p>
                  <p className="font-display font-bold text-text-primary uppercase text-xl tracking-brutal mb-2">{entry.title}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <GameModal isOpen={gameOpen} onClose={() => setGameOpen(false)}>
          <SnakeGame onClose={() => setGameOpen(false)} />
        </GameModal>
      </div>
    </div>
  )
}
