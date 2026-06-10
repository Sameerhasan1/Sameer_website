'use client'
import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: '3rem' }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: 'var(--color-accent)', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginBottom: '0.5rem',
      }}>
        {eyebrow}
      </p>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '600',
        letterSpacing: '-0.025em', lineHeight: 1.15,
      }}>
        {title}
      </h2>
    </motion.div>
  )
}