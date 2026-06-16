'use client'
import { useRef, useEffect } from 'react'

const ITEMS = [
  'Next.js', '✦', 'TypeScript', '✦', 'Dart', '✦', 'Firebase', '✦',
  'React.js', '✦', 'Node.js', '✦', 'GCP', '✦', 'Docker', '✦',
  'PostgreSQL', '✦', 'Kubernetes', '✦', 'Vue.js', '✦', 'Nuxt.js', '✦',
  'Open Source', '✦', 'pub.dev', '✦', 'IEEE 2025', '✦', 'Full-Stack', '✦',
]

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div style={{
      overflow: 'hidden', borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      padding: '12px 0',
      background: 'var(--color-surface)',
      userSelect: 'none',
    }}>
      <div style={{
        display: 'flex', gap: '0',
        animation: `marquee-scroll${reverse ? '-r' : ''} 28s linear infinite`,
        width: 'max-content',
      }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: item === '✦' ? 'var(--color-accent)' : 'var(--color-text-muted)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0 18px', whiteSpace: 'nowrap',
            fontWeight: item === '✦' ? '400' : '500',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}