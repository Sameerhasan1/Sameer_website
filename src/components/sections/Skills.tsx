'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { type ComponentType } from 'react'
import * as Si from 'react-icons/si'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrambleText from '@/components/ui/ScrambleText'
import type { Skill } from '@/lib/types'

const FALLBACK_SKILLS: Skill[] = [
  { _id: 's1',  name: 'JavaScript',  iconName: 'SiJavascript', category: 'Languages',    level: 'Advanced',     order: 1 },
  { _id: 's2',  name: 'TypeScript',  iconName: 'SiTypescript', category: 'Languages',    level: 'Advanced',     order: 2 },
  { _id: 's3',  name: 'Dart',        iconName: 'SiDart',       category: 'Languages',    level: 'Advanced',     order: 3 },
  { _id: 's4',  name: 'Python',      iconName: 'SiPython',     category: 'Languages',    level: 'Intermediate', order: 4 },
  { _id: 's5',  name: 'C++',         iconName: 'SiCplusplus',  category: 'Languages',    level: 'Intermediate', order: 5 },
  { _id: 's6',  name: 'Node.js',     iconName: 'SiNodedotjs',  category: 'Backend',      level: 'Advanced',     order: 1 },
  { _id: 's7',  name: 'Express.js',  iconName: 'SiExpress',    category: 'Backend',      level: 'Advanced',     order: 2 },
  { _id: 's8',  name: 'React.js',    iconName: 'SiReact',      category: 'Frontend',     level: 'Advanced',     order: 1 },
  { _id: 's9',  name: 'Next.js',     iconName: 'SiNextdotjs',  category: 'Frontend',     level: 'Advanced',     order: 2 },
  { _id: 's10', name: 'Vue.js',      iconName: 'SiVuedotjs',   category: 'Frontend',     level: 'Intermediate', order: 3 },
  { _id: 's11', name: 'Nuxt.js',     iconName: 'SiNuxtdotjs',  category: 'Frontend',     level: 'Intermediate', order: 4 },
  { _id: 's12', name: 'TailwindCSS', iconName: 'SiTailwindcss',category: 'Frontend',     level: 'Advanced',     order: 5 },
  { _id: 's13', name: 'Flutter',     iconName: 'SiFlutter',    category: 'Frontend',     level: 'Advanced',     order: 6 },
  { _id: 's14', name: 'PostgreSQL',  iconName: 'SiPostgresql', category: 'Databases',    level: 'Advanced',     order: 1 },
  { _id: 's15', name: 'MySQL',       iconName: 'SiMysql',      category: 'Databases',    level: 'Intermediate', order: 2 },
  { _id: 's16', name: 'MongoDB',     iconName: 'SiMongodb',    category: 'Databases',    level: 'Intermediate', order: 3 },
  { _id: 's17', name: 'Google Cloud',iconName: 'SiGooglecloud',category: 'Cloud/DevOps', level: 'Advanced',     order: 1 },
  { _id: 's18', name: 'Firebase',    iconName: 'SiFirebase',   category: 'Cloud/DevOps', level: 'Advanced',     order: 2 },
  { _id: 's19', name: 'Docker',      iconName: 'SiDocker',     category: 'Cloud/DevOps', level: 'Intermediate', order: 3 },
  { _id: 's20', name: 'Kubernetes',  iconName: 'SiKubernetes', category: 'Cloud/DevOps', level: 'Familiar',     order: 4 },
  { _id: 's21', name: 'Git',         iconName: 'SiGit',        category: 'Cloud/DevOps', level: 'Advanced',     order: 5 },
]

const CATS = ['All', 'Languages', 'Backend', 'Frontend', 'Databases', 'Cloud/DevOps']

function Icon({ name }: { name?: string }) {
  if (!name) return null
  const I = Si[name as keyof typeof Si] as ComponentType<{ size?: number }> | undefined
  return I ? <I size={14} /> : null
}

const LEVEL_COLOR: Record<string, string> = {
  Expert: '#a5b4fc', Advanced: '#818cf8',
  Intermediate: '#6366f1', Familiar: 'var(--color-text-muted)',
}

export default function Skills({ data }: { data: Skill[] | null }) {
  const skills = data && data.length > 0 ? data : FALLBACK_SKILLS
  const [cat, setCat] = useState('All')

  const filtered = cat === 'All' ? skills : skills.filter(s => s.category === cat)

  return (
    <section id="skills">
      <div className="section-container">
        <SectionHeading eyebrow="expertise" title="Skills & Tech" number="02 —" />

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {CATS.map(c => (
            <button
              key={c} onClick={() => setCat(c)}
              style={{
                padding: '5px 14px', borderRadius: '999px',
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.06em', cursor: 'pointer',
                transition: 'all 0.2s',
                background: cat === c ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: `1px solid ${cat === c ? 'rgba(99,102,241,0.5)' : 'var(--color-border)'}`,
                color: cat === c ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Tag cloud */}
        <motion.div layout style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {filtered.map((skill, i) => (
            <motion.div
              key={skill._id} layout
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.25, delay: i * 0.025 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '999px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                cursor: 'default',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = LEVEL_COLOR[skill.level ?? 'Familiar']
                e.currentTarget.style.boxShadow = `0 0 16px ${LEVEL_COLOR[skill.level ?? 'Familiar']}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ color: LEVEL_COLOR[skill.level ?? 'Familiar'], display: 'flex', flexShrink: 0 }}>
                <Icon name={skill.iconName} />
              </span>
              <ScrambleText
                text={skill.name}
                speed={22}
                style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text)' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Level legend */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '2rem' }}>
          {Object.entries(LEVEL_COLOR).map(([level, color]) => (
            <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}