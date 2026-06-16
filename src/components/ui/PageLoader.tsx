'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#06060a',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2rem',
          }}
        >
          {/* Animated SH logo */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <motion.rect
              x="2" y="2" width="76" height="76" rx="8"
              stroke="#6366f1" strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.text
              x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
              fill="#6366f1" fontSize="28" fontWeight="700"
              fontFamily="JetBrains Mono, monospace" letterSpacing="-1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              SH
            </motion.text>
          </svg>

          {/* Loading bar */}
          <div style={{ width: '120px', height: '1px', background: 'rgba(99,102,241,0.2)', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%', background: 'var(--color-accent)',
                transformOrigin: 'left', borderRadius: '1px',
                boxShadow: '0 0 8px rgba(99,102,241,0.8)',
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'rgba(99,102,241,0.6)', letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            initializing...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}