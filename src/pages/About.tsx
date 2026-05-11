import { useState } from 'react'
import SkillBadge from '../components/ui/SkillBadge'
import SnakeGame from '../components/ui/SnakeGame'
import GameModal from '../components/ui/GameModal'
import { skills } from '../data/skills'
import type { Skill } from '../types'

const groups: Skill['group'][] = ['Languages', 'Frontend', 'Backend', 'Tools', 'Frameworks']

const timeline = [
  {
    year: '2024',
    title: 'Music Director',
    description: 'Took a year-long sabbatical from software engineering to be a full-time Music Director for the Salvation Army. It was an incredible experience that deepened my love for music, collaboration, and building community.',
  },
  {
    year: '2022',
    title: 'Software Engineer I',
    description: 'Started working for a fintech company building APIs, internal tools, in inbounding support, and more. Gained experience across the stack and shipped features that impacted millions of users across many banks.',
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
    <div className="pt-16">
      <div className="section-container">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="font-display font-bold text-text-primary mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
            About Me
          </h1>
          <div className="w-30 h-1 bg-gradient-accent rounded-full" />
        </div>

        {/* Bio section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div
              onClick={handleAvatarClick}
              className="w-[230px] h-[230px] rounded-3xl shadow-accent-glow cursor-pointer transition-transform duration-200 hover:scale-105 relative group"
            >
              <img src="/chad.jpg" alt="Chad Ingram" className="w-full h-full rounded-3xl object-cover" />
              {avatarClicks > 0 && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-2xl">{3 - avatarClicks}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-5 text-text-secondary leading-relaxed">
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
          <h2 className="font-display font-semibold text-text-primary text-2xl mb-8">
            Skills & Stack
          </h2>
          <div className="flex flex-col gap-8">
            {groups.map((group) => {
              const groupSkills = skills.filter((s) => s.group === group)
              return (
                <div key={group}>
                  <p className="font-mono text-accent text-xs mb-3 tracking-wider uppercase">{group}</p>
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
          <h2 className="font-display font-semibold text-text-primary text-2xl mb-8">
            Timeline
          </h2>
          <div className="flex flex-col gap-0">
            {timeline.map((entry, i) => (
              <div key={i} className="flex gap-6 relative">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mt-1 shrink-0 shadow-accent-glow" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-surface-700 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <p className="font-mono text-accent text-xs mb-1">{entry.year}</p>
                  <p className="font-display font-semibold text-text-primary mb-1">{entry.title}</p>
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
