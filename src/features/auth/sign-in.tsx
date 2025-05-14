
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { toast } from 'sonner'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate sign in request
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Signed in successfully!')
      navigate({ to: '/' })
    } catch (error) {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">Sign In</h1>
      </Header>
      <Main className="container mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-4 py-12">
        <div className="flex w-full flex-col space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
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
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button 
                  variant="link" 
                  className="px-0" 
                  onClick={() => navigate({ to: '/forgot-password' })}
                >
                  Forgot password?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="px-0" onClick={() => navigate({ to: '/sign-up' })}>
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </Main>
    </>
  )
}
