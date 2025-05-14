
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Password reset link sent to your email')
      navigate({ to: '/sign-in' })
    } catch (error) {
      toast.error('Failed to send reset link')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">Forgot Password</h1>
      </Header>
      <Main className="container mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-4 py-12">
        <div className="flex w-full flex-col space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="text-muted-foreground">
              Enter your email below and we'll send you a link to reset your password
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Sending reset link...' : 'Reset Password'}
            </Button>
          </form>
          
          <div className="text-center">
            <Button variant="link" onClick={() => navigate({ to: '/sign-in' })}>
              Back to Sign in
            </Button>
          </div>
        </div>
      </Main>
    </>
  )
}
