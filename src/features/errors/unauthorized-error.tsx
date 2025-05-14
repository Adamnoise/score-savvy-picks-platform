
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function UnauthorizedError() {
  const navigate = useNavigate()

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">401 - Unauthorized</h1>
        <p className="text-muted-foreground max-w-md">
          You don't have permission to access this page. Please sign in to continue.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => navigate({ to: '/sign-in' })}>Sign In</Button>
        <Button variant="outline" onClick={() => navigate({ to: '/' })}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
