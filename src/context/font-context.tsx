
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type Font = 'inter' | 'manrope'

type FontContextType = {
  font: Font
  setFont: (font: Font) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<Font>(() => {
    const savedFont = typeof window !== 'undefined' 
      ? localStorage.getItem('font') as Font 
      : 'inter'
    return savedFont || 'inter'
  })

  useEffect(() => {
    if (!font) return

    document.documentElement.style.setProperty('--font-primary', `var(--font-${font})`)
    localStorage.setItem('font', font)
  }, [font])

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = (): FontContextType => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
