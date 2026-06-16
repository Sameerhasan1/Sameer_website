'use client'
import { useEffect, useState } from 'react'

export default function HUDStatusBar() {
  const [time, setTime] = useState('')
  const [section, setSection] = useState('HERO')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const SECTIONS = ['hero','about','skills','experience','projects','research','achievements','contact']
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setSection(e.target.id.toUpperCase()) })
      },
      { threshold: 0.4 }
    )
    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 998,
      height: '28px', background: 'rgba(6,6,10,0.92)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center',
      padding: '0 clamp(1rem, 3vw, 2rem)',
      gap: '24px', fontFamily: 'var(--font-mono)',
      fontSize: '10px', letterSpacing: '0.1em',
    }}>
      {/* Left */}
      <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-accent)', boxShadow: '0 0 6px var(--color-accent)', display: 'inline-block' }} />
        SH_PORTFOLIO
      </span>

      <span style={{ color: 'var(--color-border)', flexShrink: 0 }}>|</span>

      <span style={{ color: 'var(--color-text-muted)' }}>
        SECTION: <span style={{ color: 'var(--color-text)' }}>{section}</span>
      </span>

      {/* Spacer */}
      <span style={{ flex: 1 }} />

      {/* Right */}
      <span style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        IST <span style={{ color: 'var(--color-text)' }}>{time}</span>
      </span>

      <span style={{ color: 'var(--color-border)', flexShrink: 0 }}>|</span>

      <span style={{ color: 'var(--color-text-muted)' }}>
        v1.0.0
      </span>
    </div>
  )
}