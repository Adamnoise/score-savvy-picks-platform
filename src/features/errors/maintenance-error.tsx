
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function MaintenanceError() {
  const navigate = useNavigate()

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">503 - Service Unavailable</h1>
        <p className="text-muted-foreground max-w-md">
          We're currently performing maintenance. Please check back later.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => window.location.reload()}>Refresh</Button>
        <Button variant="outline" onClick={() => navigate({ to: '/' })}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
