import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

export function useScramble(text: string, trigger: boolean, speed = 40) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
 const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) { setDisplay(text); return }
    frame.current = 0
    const totalFrames = text.length * 2

    const tick = () => {
      frame.current++
      const revealed = Math.floor((frame.current / totalFrames) * text.length)
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealed) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (frame.current < totalFrames + text.length) {
        raf.current = setTimeout(tick, speed) as unknown as number
      } else {
        setDisplay(text)
      }
    }
    raf.current = setTimeout(tick, 0) as unknown as number
    return () => clearTimeout(raf.current ?? undefined)
  }, [trigger, text, speed])

  return display
}