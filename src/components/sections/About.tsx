'use client'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { SiteSettings } from '@/lib/types'

const FALLBACK_BIO = `Full-stack developer with professional experience building production web applications using Dart, Node.js, Vue, Nuxt.js, and React. Developed and published open-source packages for Firebase Cloud Messaging with secure authentication and enterprise-grade reliability. Built scalable applications from scratch using modern frameworks, integrated REST APIs, and managed relational and NoSQL databases. Experience with cloud platforms including Google Cloud Platform, AWS, Docker, and Kubernetes.`

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay },
})

export default function About({ data }: { data: SiteSettings | null }) {
  const isMobile = useIsMobile()
  const bio = data?.bio ?? FALLBACK_BIO

  const cards = [
    { label: 'Location', value: data?.location ?? 'Morena, Madhya Pradesh, India' },
    { label: 'Education', value: 'B.Tech CSE · JUET, 2025' },
    { label: 'Email', value: data?.socials?.email ?? 'sameerhasanwork1@gmail.com', truncate: true },
    {
      label: 'Status', accent: true,
      value: data?.availability === 'unavailable' ? 'Not available'
           : data?.availability === 'open'        ? 'Open to offers'
           :                                        'Available for work',
    },
  ]

  return (
    <section id="about" style={{ background: 'var(--color-surface)' }}>
      <div className="section-container">
        <SectionHeading eyebrow="about me" title="Who I am" />

        <motion.p {...up(0.1)} style={{
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          color: 'var(--color-text-muted)', lineHeight: 1.9,
          maxWidth: '700px', marginBottom: '2.5rem',
        }}>
          {bio}
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '0.875rem',
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              {...up(0.15 + i * 0.07)}
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px', padding: '1.1rem 1.25rem',
                display: 'flex', flexDirection: 'column', gap: '5px',
                minWidth: 0,  /* ← prevents grid blowout */
              }}
            >
              <p style={{
                fontSize: '10px', color: 'var(--color-text-muted)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)', margin: 0,
              }}>
                {card.label}
              </p>
              <p
                title={card.truncate ? card.value : undefined}
                style={{
                  fontSize: '13px', fontWeight: '500',
                  color: (card as any).accent ? '#4ade80' : 'var(--color-text)',
                  margin: 0, lineHeight: 1.5,
                  /* Email: single line with ellipsis instead of weird mid-word break */
                  ...(card.truncate ? {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  } : {
                    wordBreak: 'break-word',
                  }),
                }}
              >
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}