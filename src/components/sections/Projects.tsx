'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Project } from '@/lib/types'

/* ── All known projects pre-filled ── */
const FALLBACK: Project[] = [

  // ── Work ──
  {
    _id: 'w1', title: 'IntelliToggle',
    slug: { current: 'intellitoggle' },
    description: 'Feature flag management platform built from scratch at Aortem. OAuth2 auth, REST APIs for full flag lifecycle (create, update, delete, real-time toggle), deployed on Fortrabbit with CI/CD.',
    coverImage: null as any,
    techStack: ['Nuxt.js', 'Vue', 'CraftCMS', 'MySQL', 'OAuth2'],
    liveUrl: 'https://intellitoggle.com',
    category: 'work', featured: true, order: 1,
  },
  {
    _id: 'w2', title: 'Mantegrity',
    slug: { current: 'mantegrity' },
    description: 'Platform developed at Storybox Media. Built reusable React.js components, optimized Node.js APIs, integrated delivery services and payment gateway APIs in Agile sprints.',
    coverImage: null as any,
    techStack: ['React.js', 'Node.js', 'REST APIs', 'Payment Gateway'],
    liveUrl: 'https://mantegrity.in',
    category: 'work', featured: false, order: 2,
  },

  // ── Open Source ──
  {
    _id: 'os1', title: 'firebase_fcm_client',
    slug: { current: 'firebase-fcm-client' },
    description: 'Production-ready Dart package for Firebase Cloud Messaging HTTP v1 API. Secure service account impersonation, automatic token caching, Cloud Run / GKE / Docker / Kubernetes support. 222+ downloads on pub.dev.',
    coverImage: null as any,
    techStack: ['Dart', 'Firebase', 'GCP', 'Cloud Run', 'Kubernetes'],
    githubUrl: 'https://github.com/Sameerhasan1/firebase_fcm_client',
    npmUrl: 'https://pub.dev/packages/firebase_fcm_client',
    category: 'open-source', featured: true, order: 3,
  },

  // ── Personal ──
  {
    _id: 'p1', title: 'VedaAI',
    slug: { current: 'vedaai' },
    description: 'AI-powered assessment creator for educators. Generate and manage AI question papers, track student assignments across class groups, and access an AI Teacher\'s Toolkit — all in one school platform.',
    coverImage: null as any,
    techStack: ['React', 'Next.js', 'AI Integration', 'Vercel'],
    githubUrl: 'https://github.com/Sameerhasan1/vedaai',
    liveUrl: 'https://vedaai-eta.vercel.app/assignments',
    category: 'personal', featured: true, order: 4,
  },
  {
    _id: 'p2', title: 'Legal Hero',
    slug: { current: 'legal-hero' },
    description: 'Comprehensive legal practice management platform. Track matters, coordinate schedules, manage clients, centralize documents, and handle client communication — all in one unified system.',
    coverImage: null as any,
    techStack: ['React', 'Next.js', 'Node.js', 'Netlify'],
    githubUrl: 'https://github.com/Sameerhasan1/legal_hero',
    liveUrl: 'https://sameerhasanlegalhero.netlify.app',
    category: 'personal', featured: false, order: 5,
  },
  {
    _id: 'p3', title: 'FinTrack',
    slug: { current: 'finance-dashboard' },
    description: 'Real-time financial data visualization dashboard with interactive charts and clean UI. Explored Kafka-style event streaming for live analytics pipelines.',
    coverImage: null as any,
    techStack: ['React', 'Chart.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/Sameerhasan1/finance-dashboard',
    liveUrl: 'https://fintrackofficial.netlify.app',
    category: 'personal', featured: false, order: 6,
  },
  {
    _id: 'p4', title: 'DataCrafted',
    slug: { current: 'datacrafted' },
    description: 'Real-time data visualization platform — interactive analytics dashboards with React + Chart.js frontend and Django REST APIs, built with clean architecture and scalability.',
    coverImage: null as any,
    techStack: ['Django REST', 'React', 'Chart.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/Sameerhasan1',
    category: 'personal', featured: false, order: 7,
  },
  {
    _id: 'p5', title: 'Artec',
    slug: { current: 'artec' },
    description: 'Currently in active development. A new project in the works — check back soon or follow the GitHub repo for updates.',
    coverImage: null as any,
    techStack: ['In Progress'],
    githubUrl: 'https://github.com/Sameerhasan1/Artec',
    category: 'personal', featured: false, order: 8,
  },
]

const FILTERS = ['All', 'Work', 'Open Source', 'Personal'] as const
const FILTER_MAP: Record<string, string> = {
  'Work': 'work', 'Open Source': 'open-source', 'Personal': 'personal',
}
const GRAD: Record<string, string> = {
  work:          'linear-gradient(135deg, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.06) 100%)',
  'open-source': 'linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(99,102,241,0.07) 100%)',
  personal:      'linear-gradient(135deg, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.06) 100%)',
}

/* ── Mini browser preview for live URLs ── */
function LivePreview({ url }: { url: string }) {
  const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div style={{
      height: '168px', overflow: 'hidden',
      background: '#08080c', position: 'relative',
      borderBottom: '1px solid var(--color-border)',
    }}>
      {/* Browser chrome */}
      <div style={{
        height: '24px', background: 'rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: '0 10px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0, position: 'relative', zIndex: 2,
      }}>
        {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
          <span key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <span style={{
          flex: 1, marginLeft: '8px', fontSize: '9px',
          color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          🔒 {domain}
        </span>
      </div>

      {/* Scaled iframe — shows live site */}
      <iframe
        src={url}
        title={`Live preview of ${domain}`}
        loading="lazy"
        style={{
          position: 'absolute', top: '24px', left: 0,
          width: '260%', height: '400%',
          transform: 'scale(0.385)',
          transformOrigin: 'top left',
          border: 'none', pointerEvents: 'none',
        }}
      />

      {/* Gradient fade at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px',
        background: 'linear-gradient(transparent, #08080c)',
        zIndex: 1,
      }} />
    </div>
  )
}

/* ── Gradient placeholder (no image + no live URL) ── */
function CardPlaceholder({ title, category }: { title: string; category?: string }) {
  return (
    <div style={{
      height: '168px',
      background: GRAD[category ?? ''] ?? GRAD.personal,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '2rem',
        fontWeight: '700', color: 'rgba(255,255,255,0.1)', letterSpacing: '-0.04em',
      }}>
        {title.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}

export default function Projects({ data }: { data: Project[] | null }) {
  const projects = data && data.length > 0 ? data : FALLBACK
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === FILTER_MAP[active])

  return (
    <section id="projects">
      <div className="section-container">
        <SectionHeading eyebrow="projects" title="Things I've Built" />

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {FILTERS.map(f => (
            <button
              key={f} onClick={() => setActive(f)}
              style={{
                padding: '6px 16px', borderRadius: '999px', fontSize: '13px',
                fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s',
                background: active === f ? 'var(--color-accent)' : 'transparent',
                color: active === f ? '#fff' : 'var(--color-text-muted)',
                border: `1px solid ${active === f ? 'var(--color-accent)' : 'var(--color-border)'}`,
                fontWeight: active === f ? '500' : '400',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p._id} layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '14px', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                {/* Top: live preview or cover image or gradient placeholder */}
                <div style={{ position: 'relative' }}>
                  {p.coverImage ? (
                    <div style={{ height: '168px', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                      <Image src={urlFor(p.coverImage).width(600).height(336).url()}
                        alt={p.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  ) : p.liveUrl ? (
                    <LivePreview url={p.liveUrl} />
                  ) : (
                    <CardPlaceholder title={p.title} category={p.category} />
                  )}

                  {/* Badges */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', zIndex: 3 }}>
                    {p.featured && (
                      <span style={{
                        fontSize: '10px', padding: '3px 10px', borderRadius: '999px',
                        background: 'rgba(99,102,241,0.9)', color: '#fff',
                        fontWeight: '500', backdropFilter: 'blur(4px)',
                      }}>
                        Featured
                      </span>
                    )}
                    {p.liveUrl && (
                      <span style={{
                        fontSize: '10px', padding: '3px 10px', borderRadius: '999px',
                        background: 'rgba(34,197,94,0.85)', color: '#fff',
                        fontWeight: '500', backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', gap: '4px',
                      }}>
                        <span style={{
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: '#fff', display: 'inline-block',
                        }} />
                        Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.7rem' }}>
                  <h3 style={{
                    fontSize: '14px', fontWeight: '600',
                    fontFamily: 'var(--font-mono)', margin: 0,
                  }}>
                    {p.title}
                  </h3>

                  <p style={{
                    fontSize: '13px', color: 'var(--color-text-muted)',
                    lineHeight: 1.7, flex: 1, margin: 0,
                  }}>
                    {p.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {p.techStack?.slice(0, 4).map(t => (
                      <span key={t} style={{
                        fontSize: '11px', padding: '2px 9px', borderRadius: '999px',
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)',
                      }}>
                        {t}
                      </span>
                    ))}
                    {(p.techStack?.length ?? 0) > 4 && (
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', padding: '2px 4px' }}>
                        +{p.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', paddingTop: '4px' }}>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="social-link" style={{ fontSize: '12px' }}>GitHub ↗</a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="social-link" style={{ fontSize: '12px', color: '#4ade80' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#86efac')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#4ade80')}
                      >
                        Visit Site ↗
                      </a>
                    )}
                    {p.npmUrl && (
                      <a href={p.npmUrl} target="_blank" rel="noopener noreferrer"
                        className="social-link" style={{ fontSize: '12px' }}>pub.dev ↗</a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer: GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: '2.5rem', paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            8 projects · 21 public repositories on GitHub
          </p>
          <a
            href="https://github.com/Sameerhasan1"
            target="_blank" rel="noopener noreferrer"
            className="btn-secondary" style={{ fontSize: '13px', padding: '8px 20px' }}
          >
            View all on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}