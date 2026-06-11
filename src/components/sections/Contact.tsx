'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import type { SiteSettings, ContactInfo } from '@/lib/types'
import { useIsMobile } from '@/hooks/useIsMobile'

const FALLBACK_INFO: ContactInfo = {
  email: 'sameerhasanwork1@gmail.com',
  location: 'Morena, Madhya Pradesh, India',
  timezone: 'IST (GMT+5:30)',
  availability: 'Available',
  responseTime: 'Usually within 24 hours',
  workMode: 'Remote / Hybrid',
}

const field = (extra?: object) => ({
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
  color: 'var(--color-text)', fontSize: '14px', fontFamily: 'inherit',
  outline: 'none', transition: 'border-color 0.2s', ...extra,
})

const labelStyle = {
  fontSize: '11px', color: 'var(--color-text-muted)', display: 'block',
  marginBottom: '6px', fontFamily: 'var(--font-mono)',
  letterSpacing: '0.06em', textTransform: 'uppercase' as const,
}

export default function Contact({ contactData, siteData }: {
  contactData: ContactInfo | null
  siteData: SiteSettings | null
}) {
  const isMobile = useIsMobile()
  const info = contactData ?? FALLBACK_INFO
  const socials = siteData?.socials

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const rows = [
    { label: 'Email', value: info.email },
    { label: 'Location', value: info.location },
    { label: 'Timezone', value: info.timezone },
    { label: 'Availability', value: info.availability },
    { label: 'Response time', value: info.responseTime },
    { label: 'Work mode', value: info.workMode },
  ].filter(r => r.value)

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--color-accent)')
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--color-border)')

  return (
    <section id="contact" style={{ background: 'var(--color-surface)' }}>
      <div className="section-container">
        <SectionHeading eyebrow="contact" title="Let's Work Together" />

        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.4fr)',
            gap: 'clamp(2rem, 6vw, 5rem)',
            alignItems: 'start',
          }}
        >

          {/* ── Left: info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p style={{
              fontSize: '1rem', color: 'var(--color-text-muted)',
              lineHeight: 1.8, marginBottom: '2.5rem',
            }}>
              Open to full-time roles, freelance contracts, and interesting collaborations.
              Drop a message and I'll get back to you quickly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {rows.map(r => (
                <div key={r.label}>
                  <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>
                    {r.label}
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text)' }}>
                    {r.value}
                  </p>
                </div>
              ))}
            </div>

            {socials && (
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                {([['github', 'GitHub'], ['linkedin', 'LinkedIn'], ['leetcode', 'LeetCode'], ['dribbble', 'Dribbble']] as const)
                  .filter(([k]) => socials[k])
                  .map(([k, label]) => (
                    <a key={k} href={socials[k]!} target="_blank" rel="noopener noreferrer" className="social-link">
                      {label} ↗
                    </a>
                  ))}
              </div>
            )}
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
            }}
          >
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}>✦</span>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Message sent!</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                  I'll get back to you within 24 hours.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ fontSize: '13px', marginTop: '0.5rem' }}>
                  Send another
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input type="text" placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={field()} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={field()} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea placeholder="What's on your mind?" rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={field({ resize: 'vertical', minHeight: '120px' })}
                    onFocus={focus} onBlur={blur} />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: '13px', color: '#f87171', margin: 0 }}>
                    Failed to send. Email me directly at {info.email}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{ opacity: status === 'loading' ? 0.7 : 1, justifyContent: 'center' }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}