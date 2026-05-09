import SkillBadge from '../components/ui/SkillBadge'
import { skills } from '../data/skills'
import type { Skill } from '../types'

const groups: Skill['group'][] = ['Languages', 'Frontend', 'Backend', 'Tools']

const timeline = [
  {
    year: '2024',
    title: 'Senior Full-Stack Developer',
    description: 'Leading product development across React frontends and Node.js microservices.',
  },
  {
    year: '2022',
    title: 'Launched First OSS Project',
    description: 'Published CLI Toolkit on npm — 500+ downloads in the first month.',
  },
  {
    year: '2020',
    title: 'Full-Stack Developer',
    description: 'Joined a startup building real-time collaboration tools. Shipped v1 in 3 months.',
  },
  {
    year: '2018',
    title: 'Started Coding Seriously',
    description: 'Built my first web app — a personal budgeting tool — and never looked back.',
  },
]

export default function About() {
  return (
    <div className="pt-16">
      <div className="section-container">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="font-display font-bold text-text-primary mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
            About Me
          </h1>
          <div className="w-16 h-1 bg-gradient-accent rounded-full" />
        </div>

        {/* Bio section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="w-[230px] h-[230px] rounded-3xl shadow-accent-glow">
              <img src="/chad.jpg" alt="Chad Ingram" className="w-full h-full rounded-3xl object-cover" />
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-5 text-text-secondary leading-relaxed">
            <p>
              Hi, I’m Chad!
            </p>
            <p>
              A Father, Software Engineer, Music Director, and lifelong learner who believes the most meaningful things we build are the ones that connect people.
            </p>
            <p>
              Fatherhood is at the center of who I am. It’s shaped the way I approach life, work, creativity, and problem-solving. Being a dad has taught me patience, adaptability, curiosity, and the importance of building things that truly matter — whether that’s supporting my family, creating software, or making music with others.
            </p>
            <p>
              Professionally, I come from a Computer Science background and enjoy developing software solutions that simplify problems and improve experiences. I’m especially drawn to projects where technology and creativity intersect — the kind of work that feels both practical and human.
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
      </div>
    </div>
  )
}
