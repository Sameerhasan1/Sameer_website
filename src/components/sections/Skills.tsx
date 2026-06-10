'use client'
import { motion } from 'framer-motion'
import { type ComponentType } from 'react'
import * as Si from 'react-icons/si'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Skill } from '@/lib/types'

const FALLBACK_SKILLS: Skill[] = [
  // Languages
  { _id: 's1', name: 'JavaScript', iconName: 'SiJavascript', category: 'Languages', level: 'Advanced' },
  { _id: 's2', name: 'TypeScript', iconName: 'SiTypescript', category: 'Languages', level: 'Advanced' },
  { _id: 's3', name: 'Dart', iconName: 'SiDart', category: 'Languages', level: 'Advanced' },
  { _id: 's4', name: 'Python', iconName: 'SiPython', category: 'Languages', level: 'Intermediate' },
  { _id: 's5', name: 'C++', iconName: 'SiCplusplus', category: 'Languages', level: 'Intermediate' },
  { _id: 's6', name: 'SQL', iconName: 'SiMysql', category: 'Languages', level: 'Intermediate' },
  // Backend
  { _id: 's7', name: 'Node.js', iconName: 'SiNodedotjs', category: 'Backend', level: 'Advanced' },
  { _id: 's8', name: 'Express.js', iconName: 'SiExpress', category: 'Backend', level: 'Advanced' },
  // Frontend
  { _id: 's9',  name: 'React.js',    iconName: 'SiReact',      category: 'Frontend', level: 'Advanced' },
  { _id: 's10', name: 'Next.js',     iconName: 'SiNextdotjs',  category: 'Frontend', level: 'Advanced' },
  { _id: 's11', name: 'Vue.js',      iconName: 'SiVuedotjs',   category: 'Frontend', level: 'Intermediate' },
  { _id: 's12', name: 'Nuxt.js',     iconName: 'SiNuxtdotjs',  category: 'Frontend', level: 'Intermediate' },
  { _id: 's13', name: 'TailwindCSS', iconName: 'SiTailwindcss',category: 'Frontend', level: 'Advanced' },
  { _id: 's14', name: 'Flutter',     iconName: 'SiFlutter',    category: 'Frontend', level: 'Advanced' },
  // Databases
  { _id: 's15', name: 'PostgreSQL', iconName: 'SiPostgresql', category: 'Databases', level: 'Advanced' },
  { _id: 's16', name: 'MySQL',      iconName: 'SiMysql',      category: 'Databases', level: 'Intermediate' },
  { _id: 's17', name: 'MongoDB',    iconName: 'SiMongodb',    category: 'Databases', level: 'Intermediate' },
  // Cloud / DevOps
  { _id: 's18', name: 'Google Cloud', iconName: 'SiGooglecloud', category: 'Cloud/DevOps', level: 'Advanced' },
  { _id: 's19', name: 'Firebase',     iconName: 'SiFirebase',    category: 'Cloud/DevOps', level: 'Advanced' },
  { _id: 's20', name: 'Docker',       iconName: 'SiDocker',      category: 'Cloud/DevOps', level: 'Intermediate' },
  { _id: 's21', name: 'Kubernetes',   iconName: 'SiKubernetes',  category: 'Cloud/DevOps', level: 'Familiar' },
  { _id: 's22', name: 'Git',          iconName: 'SiGit',         category: 'Cloud/DevOps', level: 'Advanced' },
]

const CATEGORY_ORDER = ['Languages', 'Backend', 'Frontend', 'Databases', 'Cloud/DevOps', 'Tools']

function SkillIcon({ iconName }: { iconName?: string }) {
  if (!iconName) return null
  const Icon = Si[iconName as keyof typeof Si] as ComponentType<{ size?: number }> | undefined
  if (!Icon) return null
  return <Icon size={18} />
}

function groupSkills(skills: Skill[]) {
  const map: Record<string, Skill[]> = {}
  skills.forEach(s => { (map[s.category] ??= []).push(s) })
  return CATEGORY_ORDER.filter(c => map[c]).map(c => ({ category: c, items: map[c] }))
}

export default function Skills({ data }: { data: Skill[] | null }) {
  const skills = data && data.length > 0 ? data : FALLBACK_SKILLS
  const grouped = groupSkills(skills)

  return (
    <section id="skills">
      <div className="section-container">
        <SectionHeading eyebrow="expertise" title="Skills & Technologies" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {grouped.map(({ category, items }, gi) => (
            <div key={category}>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: gi * 0.04 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--color-text-muted)', letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: '1rem',
                  paddingBottom: '0.6rem', borderBottom: '1px solid var(--color-border)',
                }}
              >
                {category}
              </motion.p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
                gap: '0.625rem',
              }}>
                {items.map((skill, i) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ borderColor: 'rgba(99,102,241,0.45)', backgroundColor: 'rgba(99,102,241,0.05)' }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '9px',
                      padding: '9px 13px',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px', cursor: 'default',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <span style={{ color: 'var(--color-text-muted)', flexShrink: 0, display: 'flex' }}>
                      <SkillIcon iconName={skill.iconName} />
                    </span>
                    <span style={{
                      fontSize: '13px', fontWeight: '500',
                      color: 'var(--color-text)', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}