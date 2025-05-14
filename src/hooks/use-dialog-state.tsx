
import { useState } from 'react'

export function useDialogState(defaultOpen = false) {
  const [isOpen, setOpen] = useState(defaultOpen)

  const open = () => setOpen(true)
  const close = () => setOpen(false)
  const toggle = () => setOpen(!isOpen)

  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
  }
}
