'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SiteSettings } from '@/lib/types'

const AVAIL_COLOR = {
  available: '#22c55e',
  open: '#f59e0b',
  unavailable: '#6b7280',
}

const AVAIL_LABEL = {
  available: 'Available for work',
  open: 'Open to offers',
  unavailable: 'Not available',
}

const STATS = [
  { value: '222+', label: 'pub.dev downloads' },
  { value: '21', label: 'GitHub repos' },
  { value: '100%', label: 'IEEE paper accuracy' },
]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

// Fallback data from resume — used while Sanity is empty
const FALLBACK: Partial<SiteSettings> = {
  name: 'Sameer Hasan',
  title: 'Full-Stack Developer',
  tagline: 'Building scalable systems, open-source packages, and production-grade web applications.',
  availability: 'available',
  resumeUrl: 'https://drive.google.com/file/d/1e8ZUWcRw3xxvOmdhZ0gNQqXhG2rmw7Jm/view',
  socials: {
    github: 'https://github.com/Sameerhasan1',
    linkedin: 'https://www.linkedin.com/in/sameer-h-607594205/',
  },
}

export default function Hero({ data }: { data: SiteSettings | null }) {
  const d = { ...FALLBACK, ...data } as SiteSettings
  const availColor = AVAIL_COLOR[d.availability] ?? AVAIL_COLOR.available
  const availLabel = AVAIL_LABEL[d.availability] ?? AVAIL_LABEL.available

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: 'clamp(5.5rem, 12vw, 9rem) clamp(1.5rem, 5vw, 3rem) 3rem',
      width: '100%',
    }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        width: '100%',
        }}>

        {/* ── Left: Text ── */}
        <div>
          {/* Availability badge */}
          <motion.div {...up(0)} style={{ marginBottom: '1.75rem', display: 'inline-flex' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 14px', borderRadius: '999px',
              border: '1px solid var(--color-border)',
              fontSize: '12px', color: 'var(--color-text-muted)',
              letterSpacing: '0.03em',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: availColor, flexShrink: 0,
                animation: 'pulse-dot 2.5s ease-in-out infinite',
                color: availColor,
              }} />
              {availLabel}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 {...up(0.08)} style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 4.5rem)',
            fontWeight: '600', lineHeight: '1.06',
            letterSpacing: '-0.03em', marginBottom: '0.6rem',
          }}>
            {d.name}
          </motion.h1>

          {/* Title */}
          <motion.p {...up(0.14)} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'var(--color-accent)',
            marginBottom: '1.4rem', fontWeight: '400',
          }}>
            {d.title}
          </motion.p>

          {/* Tagline */}
          <motion.p {...up(0.2)} style={{
            fontSize: '1rem', color: 'var(--color-text-muted)',
            lineHeight: '1.8', maxWidth: '500px', marginBottom: '2.25rem',
          }}>
            {d.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...up(0.26)}
            className="hero-ctas"
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            {d.resumeUrl && (
              <a href={d.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View CV ↗
              </a>
            )}
            <button
              className="btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in touch
            </button>
          </motion.div>

          {/* Socials */}
          {d.socials && (
            <motion.div {...up(0.32)}
              className="hero-socials"
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
            >
              {([
                ['github', 'GitHub'],
                ['linkedin', 'LinkedIn'],
                ['leetcode', 'LeetCode'],
                ['dribbble', 'Dribbble'],
              ] as const).filter(([key]) => d.socials?.[key]).map(([key, label]) => (
                <a key={key} href={d.socials![key]} target="_blank"
                   rel="noopener noreferrer" className="social-link">
                  {label} ↗
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Right: Photo ── */}
        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <div style={{
            width: 'clamp(200px, 22vw, 268px)',
            aspectRatio: '1',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid var(--color-border)',
            position: 'relative',
            boxShadow: '0 0 0 8px rgba(99,102,241,0.06), 0 0 70px rgba(99,102,241,0.14)',
          }}>
            {d.profilePhoto ? (
              <Image
                src={urlFor(d.profilePhoto).width(536).height(536).url()}
                alt={d.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 200px, 268px"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              // ↓ now uses your local photo instead of "SH" text
              <Image
                src="/images/Profileme.png"
                alt={d.name ?? 'Sameer Hasan'}
                fill
                sizes="(max-width: 768px) 200px, 268px"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                priority
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="hero-stats"
        style={{
          display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap',
          marginTop: 'clamp(3rem, 7vw, 5rem)',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {STATS.map(stat => (
          <div key={stat.label}>
            <p style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '600',
              fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em',
              color: 'var(--color-text)', lineHeight: 1, marginBottom: '5px',
            }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', letterSpacing: '0.03em' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

    </section>
  )
}