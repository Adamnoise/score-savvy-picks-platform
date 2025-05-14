
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function NotFoundError() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">404 - Page Not Found</h1>
        <p className="text-muted-foreground max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
