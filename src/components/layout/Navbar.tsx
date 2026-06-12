'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const NAV = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Research', id: 'research' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const { theme, toggle } = useTheme()
  

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (y / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Reading progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '2px',
        width: `${progress}%`, background: 'var(--color-accent)',
        zIndex: 1001, transition: 'width 0.08s linear',
      }} />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: '60px', padding: '0 clamp(1.5rem, 5vw, 3rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(9,9,9,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <span className="nav-logo-box" style={{
            width: '30px', height: '30px', borderRadius: '7px',
            background: 'var(--color-accent)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '600', color: '#fff',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
          }}>
            SH
          </span>
          <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--color-text)' }}>
            Sameer
          </span>
        </button>

        {/* Desktop links */}
        <nav className="nav-desktop" style={{ display: 'flex', gap: '2px' }}>
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 14px', borderRadius: '6px', fontSize: '13.5px',
                fontFamily: 'inherit', letterSpacing: '0.01em',
                color: active === id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                fontWeight: active === id ? '500' : '400',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {label}
            </button>
          ))}
        </nav>

         <button
            onClick={toggle}
            title={theme === 'terminal' ? 'Exit terminal mode' : 'Switch to terminal theme'}
            style={{
              background: 'none',
              border: `1px solid ${theme === 'terminal' ? 'rgba(0,255,65,0.5)' : 'var(--color-border)'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '5px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: theme === 'terminal' ? '#00ff41' : 'var(--color-text-muted)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              boxShadow: theme === 'terminal' ? '0 0 10px rgba(0,255,65,0.3)' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = theme === 'terminal' ? '#00ff41' : 'var(--color-accent)'
              e.currentTarget.style.color = theme === 'terminal' ? '#57ff7a' : 'var(--color-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = theme === 'terminal' ? 'rgba(0,255,65,0.5)' : 'var(--color-border)'
              e.currentTarget.style.color = theme === 'terminal' ? '#00ff41' : 'var(--color-text-muted)'
            }}
          >
            {theme === 'terminal' ? '◈ exit' : '>_ hack'}
          </button> 
          

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setOpen(!open)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: '5px', padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '20px', height: '1.5px',
              background: 'var(--color-text)', borderRadius: '1px',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: open
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', top: '60px', left: 0, right: 0,
              background: 'rgba(9,9,9,0.96)', backdropFilter: 'blur(14px)',
              borderBottom: '1px solid var(--color-border)',
              zIndex: 999, padding: '0.75rem 1.5rem 1.25rem',
              display: 'flex', flexDirection: 'column', gap: '2px',
            }}
          >
            {NAV.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '11px 12px', borderRadius: '6px', fontSize: '15px',
                  color: active === id ? 'var(--color-accent)' : 'var(--color-text)',
                  textAlign: 'left', fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}