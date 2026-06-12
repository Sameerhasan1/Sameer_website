'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'default' | 'terminal'

interface ThemeCtx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ theme: 'default', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default')

  useEffect(() => {
    const stored = localStorage.getItem('sh-theme') as Theme | null
    const t = stored === 'terminal' ? 'terminal' : 'default'
    setTheme(t)
    document.body.setAttribute('data-theme', t)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'default' ? 'terminal' : 'default'
    setTheme(next)
    localStorage.setItem('sh-theme', next)
    document.body.setAttribute('data-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)