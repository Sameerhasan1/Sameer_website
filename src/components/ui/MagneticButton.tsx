'use client'
import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  className,
  style,
  onClick,
  href,
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  href?: string
  strength?: number
}) {
  const ref  = useRef<HTMLDivElement>(null)
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)
  const x    = useSpring(xRaw, { stiffness: 350, damping: 20 })
  const y    = useSpring(yRaw, { stiffness: 350, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    xRaw.set((e.clientX - cx) * strength)
    yRaw.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { xRaw.set(0); yRaw.set(0) }

  const inner = (
    <motion.div ref={ref} style={{ x, y, display: 'inline-flex' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className={className} style={style}>{children}</a>
      ) : (
        <button onClick={onClick} className={className} style={style}>{children}</button>
      )}
    </motion.div>
  )
  return inner
}