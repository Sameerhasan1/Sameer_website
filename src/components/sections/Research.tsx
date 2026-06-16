'use client'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import HUDCorners from '@/components/ui/HUDCorners'
import type { Publication } from '@/lib/types'

const FALLBACK: Publication[] = [
  {
    _id: 'r1',
    title: 'Indian Sign Language Recognition Using MobileNetV2',
    journal: 'IEEE Conference',
    year: '2025',
    abstract: 'This paper presents a high-accuracy approach to Indian Sign Language (ISL) recognition using MobileNetV2, a lightweight convolutional neural network architecture optimized for mobile and embedded applications. The system leverages transfer learning to achieve exceptional accuracy in recognizing ISL gestures, contributing to more accessible communication tools for the hearing-impaired community.',
    authors: ['Sameer Hasan'],
    url: 'https://ieeexplore.ieee.org/document/11340772',
    tags: ['MobileNetV2', 'Deep Learning', 'Sign Language', 'CNN', 'Transfer Learning', 'Computer Vision'],
    highlight: '100% accuracy',
  },
]

export default function Research({ data }: { data: Publication[] | null }) {
  const publications = data && data.length > 0 ? data : FALLBACK

  return (
    <section id="research" style={{ background: 'var(--color-surface)' }}>
      <div className="section-container">
        <SectionHeading eyebrow="research" title="Publications" number="05 —" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {publications.map((pub, i) => (
            <motion.div
              key={pub._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              // ↓ HUD card replaces borderRadius
              className="hud-card"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 0,                          // clip-path handles corners
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              {/* ↓ Anime corner brackets */}
              <HUDCorners size={16} />

              {/* Accent glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '360px', height: '240px',
                background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.09) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
              }} />

              {/* All content needs z-index above the glow */}
              <div style={{ position: 'relative', zIndex: 1 }}>

                {/* Badges row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontSize: '10px', padding: '3px 10px',
                    background: 'rgba(99,102,241,0.12)', color: 'var(--color-accent)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    fontFamily: 'var(--font-mono)', fontWeight: '500',
                    letterSpacing: '0.06em',
                  }}>
                    {pub.journal}
                  </span>
                  <span style={{
                    fontSize: '10px', padding: '3px 10px',
                    background: 'transparent', color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                  }}>
                    {pub.year}
                  </span>
                  {pub.highlight && (
                    <span style={{
                      fontSize: '10px', padding: '3px 10px',
                      background: 'rgba(34,197,94,0.12)', color: '#4ade80',
                      border: '1px solid rgba(34,197,94,0.3)',
                      fontFamily: 'var(--font-mono)', fontWeight: '600',
                      letterSpacing: '0.06em',
                    }}>
                      ✦ {pub.highlight}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', fontWeight: '600',
                  lineHeight: 1.3, marginBottom: '1rem', letterSpacing: '-0.01em',
                }}>
                  {pub.title}
                </h3>

                {/* Abstract */}
                {pub.abstract && (
                  <p style={{
                    fontSize: '13.5px', color: 'var(--color-text-muted)',
                    lineHeight: 1.85, marginBottom: '1.25rem',
                    display: '-webkit-box', WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {pub.abstract}
                  </p>
                )}

                {/* Authors */}
                {pub.authors && pub.authors.length > 0 && (
                  <p style={{
                    fontSize: '12px', color: 'var(--color-text-muted)',
                    marginBottom: '1.25rem', fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}>
                    <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>AUTHORS //</span>
                    <span style={{ color: 'var(--color-text)' }}>{pub.authors.join(', ')}</span>
                  </p>
                )}

                {/* Tags */}
                {pub.tags && pub.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.75rem' }}>
                    {pub.tags.map(t => (
                      <span key={t} style={{
                        fontSize: '10px', padding: '3px 10px',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA links */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {pub.url && (
                    <a
                      href={pub.url} target="_blank" rel="noopener noreferrer"
                      className="btn-neon"
                      style={{ fontSize: '11px', padding: '8px 20px' }}
                    >
                      Read Paper ↗
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: '11px', padding: '8px 20px' }}
                    >
                      DOI ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}