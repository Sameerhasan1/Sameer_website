'use client'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
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
        <SectionHeading eyebrow="research" title="Publications" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {publications.map((pub, i) => (
            <motion.div
              key={pub._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Accent glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '360px', height: '240px',
                background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.09) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Badges row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                  background: 'rgba(99,102,241,0.15)', color: 'var(--color-accent)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  fontFamily: 'var(--font-mono)', fontWeight: '500',
                }}>
                  {pub.journal}
                </span>
                <span style={{
                  fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                  background: 'transparent', color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {pub.year}
                </span>
                {pub.highlight && (
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                    background: 'rgba(34,197,94,0.15)', color: '#4ade80',
                    border: '1px solid rgba(34,197,94,0.3)',
                    fontFamily: 'var(--font-mono)', fontWeight: '600',
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
                  fontSize: '14px', color: 'var(--color-text-muted)',
                  lineHeight: 1.85, marginBottom: '1.25rem',
                  display: '-webkit-box', WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {pub.abstract}
                </p>
              )}

              {/* Authors */}
              {pub.authors && pub.authors.length > 0 && (
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                  <span style={{ marginRight: '6px' }}>Authors:</span>
                  <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>{pub.authors.join(', ')}</span>
                </p>
              )}

              {/* Tags */}
              {pub.tags && pub.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.75rem' }}>
                  {pub.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                      color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA links */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {pub.url && (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ fontSize: '13px', padding: '8px 20px' }}>
                    Read Paper ↗
                  </a>
                )}
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
                    className="btn-secondary" style={{ fontSize: '13px', padding: '8px 20px' }}>
                    DOI ↗
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