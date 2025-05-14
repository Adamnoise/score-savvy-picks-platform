
import { AxiosError } from 'axios'
import { toast } from 'sonner'

/**
 * Handle server errors in a consistent way
 */
export function handleServerError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status

    // Handle authentication errors
    if (status === 401) {
      toast.error('Authentication required. Please sign in.')
      return
    }

    // Handle permission errors
    if (status === 403) {
      toast.error('You don\'t have permission to perform this action.')
      return
    }

    // Handle not found errors
    if (status === 404) {
      toast.error('The requested resource was not found.')
      return
    }

    // Handle validation errors with detailed messages if available
    if (status === 422 || status === 400) {
      const data = error.response?.data
      
      if (data?.message) {
        toast.error(data.message)
        return
      }
      
      if (data?.errors) {
        // Show first error message
        const firstError = Object.values(data.errors)[0]
        if (Array.isArray(firstError) && firstError.length > 0) {
          toast.error(firstError[0])
          return
        }
      }
      
      toast.error('Invalid data submitted. Please check your inputs.')
      return
    }
    
    // Handle rate limit errors
    if (status === 429) {
      toast.error('Too many requests. Please try again later.')
      return
    }

    // Handle server errors
    if (status && status >= 500) {
      toast.error('Server error. Please try again later.')
      return
    }

    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      toast.error('Network error. Please check your connection.')
      return
    }
  }

  // Handle other errors
  toast.error('An unexpected error occurred.')
}
