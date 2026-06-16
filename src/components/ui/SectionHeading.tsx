'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrambleText from './ScrambleText'

interface Props {
  eyebrow: string
  title: string
  number?: string
}

export default function SectionHeading({ eyebrow, title, number }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: '3rem' }}
    >
      <div className="section-eyebrow">
        {number && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'var(--color-accent)', letterSpacing: '0.1em',
          }}>
            {number}
          </span>
        )}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--color-text-muted)', letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {eyebrow}
        </span>
      </div>

      <h2 style={{
        fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', fontWeight: '700',
        letterSpacing: '-0.03em', lineHeight: 1.1,
      }}>
        <ScrambleText text={title} triggerOnMount={inView} speed={25} />
      </h2>
    </motion.div>
  )
}