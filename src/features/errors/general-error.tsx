
import { useEffect } from 'react'
import { useNavigate, useRouteError } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function GeneralError() {
  const error = useRouteError()
  const navigate = useNavigate()

  useEffect(() => {
    console.error('Route Error:', error)
  }, [error])

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-md">
          We apologize for the inconvenience. An error has occurred while loading this page.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh the page
        </Button>
      </div>
    </div>
  )
}
