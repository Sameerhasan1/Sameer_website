'use client'
import { useEffect, useState } from 'react'

export default function GlitchText({ text, className, style }: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    // Fire glitch 0.8s after mount
    const t1 = setTimeout(() => setGlitching(true),  800)
    const t2 = setTimeout(() => setGlitching(false), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <span
      className={className}
      data-text={text}
      style={{
        position: 'relative', display: 'inline-block',
        ...style,
      }}
    >
      {text}
      {/* Red ghost */}
      <span aria-hidden style={{
        position: 'absolute', top: 0, left: 0,
        color: '#ef4444', clipPath: 'polygon(0 30%,100% 30%,100% 50%,0 50%)',
        animation: glitching ? 'glitch-r 0.15s steps(1) infinite' : 'none',
        opacity: glitching ? 0.8 : 0, pointerEvents: 'none',
        width: '100%',
      }}>
        {text}
      </span>
      {/* Cyan ghost */}
      <span aria-hidden style={{
        position: 'absolute', top: 0, left: 0,
        color: '#22d3ee', clipPath: 'polygon(0 60%,100% 60%,100% 75%,0 75%)',
        animation: glitching ? 'glitch-c 0.15s steps(1) infinite reverse' : 'none',
        opacity: glitching ? 0.8 : 0, pointerEvents: 'none',
        width: '100%',
      }}>
        {text}
      </span>
    </span>
  )
}