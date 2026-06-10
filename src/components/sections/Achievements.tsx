'use client'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Achievement } from '@/lib/types'

const FALLBACK: Achievement[] = [
  { _id: 'a1', title: 'Published Open-Source Package', issuer: 'pub.dev', year: '2025', description: 'firebase_fcm_client — production-ready FCM Dart package with 222+ downloads.', type: 'open-source', order: 1 },
  { _id: 'a2', title: 'IEEE Conference Presentation', issuer: 'IEEE', year: '2025', description: '100% accuracy in Indian Sign Language Recognition using MobileNetV2.', type: 'conference', order: 2 },
  { _id: 'a3', title: 'Hands-on Deep Learning Training', issuer: 'Infosys Springboard', year: '2024', type: 'certification', order: 3 },
  { _id: 'a4', title: 'Python Foundation Certification', issuer: 'Infosys Springboard', year: '2025', type: 'certification', order: 4 },
  { _id: 'a5', title: 'Learning Python', issuer: 'Infosys Springboard', year: '2025', type: 'certification', order: 5 },
  { _id: 'a6', title: 'Responsive Web Development', issuer: 'Infosys Springboard', year: '2023', description: 'HTML5, CSS3, and JavaScript.', type: 'certification', order: 6 },
]

const COLORS: Record<string, { bg: string; fg: string }> = {
  'open-source': { bg: 'rgba(99,102,241,0.12)',  fg: '#818cf8' },
  certification: { bg: 'rgba(16,185,129,0.12)',  fg: '#34d399' },
  conference:    { bg: 'rgba(245,158,11,0.12)',  fg: '#fbbf24' },
  award:         { bg: 'rgba(239,68,68,0.12)',   fg: '#f87171' },
}
const LABELS: Record<string, string> = {
  'open-source': 'Open Source', certification: 'Certification',
  conference: 'Conference', award: 'Award',
}

export default function Achievements({ data }: { data: Achievement[] | null }) {
  const items = data && data.length > 0 ? data : FALLBACK

  return (
    <section id="achievements">
      <div className="section-container">
        <SectionHeading eyebrow="recognition" title="Achievements & Certifications" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {items.map((item, i) => {
            const c = COLORS[item.type ?? 'certification'] ?? COLORS.certification
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ borderColor: c.fg + '44', transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px', padding: '1.25rem',
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '10px', padding: '2px 8px', borderRadius: '999px',
                    background: c.bg, color: c.fg,
                    fontFamily: 'var(--font-mono)', fontWeight: '500', letterSpacing: '0.04em',
                  }}>
                    {LABELS[item.type ?? 'certification']}
                  </span>
                  {item.year && (
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {item.year}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: '600', lineHeight: 1.4, color: 'var(--color-text)', margin: 0 }}>
                  {item.title}
                </h3>

                {item.description && (
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6, flex: 1, margin: 0 }}>
                    {item.description}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  {item.issuer && (
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '500' }}>
                      {item.issuer}
                    </span>
                  )}
                  {item.credentialUrl && (
                    <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer"
                      className="social-link" style={{ fontSize: '11px', marginLeft: 'auto' }}>
                      View ↗
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}