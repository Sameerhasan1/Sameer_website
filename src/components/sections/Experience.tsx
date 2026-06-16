'use client'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import HUDCorners from '@/components/ui/HUDCorners'
import type { Experience } from '@/lib/types'

const FALLBACK: Experience[] = [
  {
    _id: 'e1',
    company: 'Aortem',
    role: 'Frontend Developer',
    startDate: 'Sep 2025', endDate: 'Jan 2026',
    current: false, locationType: 'Remote',
    bullets: [
      'Built intellitoggle.com from scratch using Nuxt.js, Vue, CraftCMS, Twig, and MySQL; deployed on Fortrabbit with full CI/CD.',
      'Developed complete UI/UX for IntelliToggle implementing OAuth2 authentication flow and secure user login system.',
      'Implemented REST APIs for feature flag management — creation, updates, deletion, and real-time toggling with validation.',
      'Published firebase_fcm_client (v0.0.3) — a production-ready Dart package with 222+ downloads and enterprise-grade FCM security.',
      'Implemented secure service account impersonation supporting Cloud Run, GKE, Docker, and Kubernetes, eliminating private key management.',
      'Built automatic token caching and refresh mechanisms, reducing authentication overhead across environments.',
    ],
    techStack: ['Nuxt.js', 'Vue', 'CraftCMS', 'MySQL', 'Dart', 'Firebase', 'GCP', 'OAuth2', 'Docker', 'Kubernetes'],
    order: 1,
  },
  {
    _id: 'e2',
    company: 'Storybox Media',
    role: 'Web Developer Intern',
    startDate: 'May 2024', endDate: 'Jul 2024',
    current: false, locationType: 'Remote',
    bullets: [
      'Developed reusable React.js components, improving frontend modularity and consistency.',
      'Built and optimized backend APIs using Node.js, focusing on performance and scalability.',
      'Implemented interactive features and responsive UIs integrated with real-time APIs.',
      'Integrated delivery services and payment gateway partner APIs.',
      'Collaborated in Agile sprints — architecture discussions, debugging, and code reviews.',
    ],
    techStack: ['React.js', 'Node.js', 'REST APIs', 'Agile/Scrum'],
    order: 2,
  },
]

export default function Experience({ data }: { data: Experience[] | null }) {
  const experiences = data && data.length > 0 ? data : FALLBACK

  return (
    <section id="experience" style={{ background: 'var(--color-surface)' }}>
      <div className="section-container">
        <SectionHeading eyebrow="work history" title="Experience" number="03 —" />

        <div style={{ position: 'relative' }}>

          {/* Timeline vertical line */}
          <div style={{
            position: 'absolute', left: '6px', top: '10px', bottom: '0',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                position: 'relative',
                paddingLeft: '2.5rem',
                paddingBottom: i < experiences.length - 1 ? '3rem' : 0,
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: 0, top: '22px',
                width: '13px', height: '13px', borderRadius: '50%',
                background: 'var(--color-bg)',
                border: '2px solid var(--color-accent)',
                boxShadow: '0 0 10px rgba(99,102,241,0.5)',
                zIndex: 1,
              }} />

              {/* ── HUD card ── */}
              <div
                className="hud-card"
                style={{
                  position: 'relative',
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                {/* Anime corner brackets */}
                <HUDCorners size={14} />

                {/* Header row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap',
                  gap: '0.5rem', marginBottom: '1.1rem',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.05rem', fontWeight: '600',
                      color: 'var(--color-text)', marginBottom: '3px',
                    }}>
                      {exp.role}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-accent)', fontWeight: '500' }}>
                      {exp.companyUrl ? (
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}>
                          {exp.company} ↗
                        </a>
                      ) : exp.company}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{
                      fontSize: '11px', color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
                    }}>
                      {exp.startDate} — {exp.current ? 'Present' : (exp.endDate ?? '')}
                    </p>
                    {exp.locationType && (
                      <span style={{
                        display: 'inline-block', marginTop: '4px',
                        fontSize: '10px', padding: '2px 8px',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
                      }}>
                        {exp.locationType.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{
                  listStyle: 'none', marginBottom: '1.25rem',
                  display: 'flex', flexDirection: 'column', gap: '0.55rem',
                }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{
                        color: 'var(--color-accent)', flexShrink: 0,
                        marginTop: '0.38em', fontSize: '8px',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        ▸
                      </span>
                      <span style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                {exp.techStack?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: exp.certificateUrl ? '1rem' : 0 }}>
                    {exp.techStack.map(t => (
                      <span key={t} style={{
                        fontSize: '10px', padding: '3px 10px',
                        background: 'rgba(99,102,241,0.08)',
                        color: 'var(--color-accent)',
                        border: '1px solid rgba(99,102,241,0.2)',
                        fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Certificate link */}
                {exp.certificateUrl && (
                  <a
                    href={exp.certificateUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '11px', color: 'var(--color-text-muted)',
                      textDecoration: 'none', fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.06em', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    VIEW CERTIFICATE ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}