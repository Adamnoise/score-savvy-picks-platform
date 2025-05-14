
import { ReactNode, createContext, useContext, useState } from 'react'

type SearchContextType = {
  search: string
  setSearch: (search: string) => void
  showSearch: boolean
  setShowSearch: (show: boolean) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <SearchContext.Provider value={{ search, setSearch, showSearch, setShowSearch, open, setOpen }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
