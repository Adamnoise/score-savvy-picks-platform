
import { useEffect, useState } from 'react'

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener('resize', checkIsMobile)
    checkIsMobile()

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [breakpoint])

  return isMobile
}
