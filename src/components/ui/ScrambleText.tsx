'use client'
import { useState } from 'react'
import { useScramble } from '@/hooks/useScramble'
import React from 'react'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
  speed?: number
  triggerOnMount?: boolean
}

export default function ScrambleText({
  text, className, style,
  as: Tag = 'span',
  speed = 30,
  triggerOnMount = false,
}: Props) {
  const [hover, setHover] = useState(triggerOnMount)
  const display = useScramble(text, hover || triggerOnMount, speed)

  return (
    // @ts-ignore
    <Tag
      className={className}
      style={{ fontFamily: 'inherit', letterSpacing: 'inherit', ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {display}
    </Tag>
  )
}