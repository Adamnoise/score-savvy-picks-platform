
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { toast } from 'sonner'

export default function OtpVerification() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setIsVerifying(true)
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('OTP verified successfully!')
      navigate({ to: '/' })
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <>
      <Header fixed>
        <h1 className="text-lg font-medium">OTP Verification</h1>
      </Header>
      <Main className="container mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-4 py-12">
        <div className="flex w-full flex-col space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Verify Your Account</h1>
            <p className="text-muted-foreground">
              Please enter the 6-digit code sent to your email or phone
            </p>
          </div>
          
          <div className="space-y-4">
            <InputOTP 
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className="flex justify-center gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <Button 
              className="w-full" 
              onClick={handleVerifyOtp} 
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Button>
            
            <div className="text-center">
              <Button variant="link" className="text-sm">
                Resend Code
              </Button>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
