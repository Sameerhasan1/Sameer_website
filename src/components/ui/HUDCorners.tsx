'use client'
import { motion } from 'framer-motion'

interface Props {
  size?: number
  color?: string
  thickness?: number
  animate?: boolean
}

export default function HUDCorners({
  size = 12,
  color = 'var(--color-accent)',
  thickness = 1.5,
  animate = true,
}: Props) {
  const positions = [
    { top: 0,    left: 0,   rotate: '0deg'   },
    { top: 0,    right: 0,  rotate: '90deg'  },
    { bottom: 0, right: 0,  rotate: '180deg' },
    { bottom: 0, left: 0,   rotate: '270deg' },
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}    // ← always pass object, not false
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          style={{
            position: 'absolute', zIndex: 2,
            width: size, height: size,
            ...pos,
          }}
        >
          <svg
            width={size} height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            style={{ transform: `rotate(${pos.rotate})`, display: 'block' }}
          >
            <path
              d={`M ${size} ${thickness / 2} L ${thickness / 2} ${thickness / 2} L ${thickness / 2} ${size}`}
              stroke={color}
              strokeWidth={thickness}
              strokeLinecap="square"
            />
          </svg>
        </motion.div>
      ))}
    </>
  )
}