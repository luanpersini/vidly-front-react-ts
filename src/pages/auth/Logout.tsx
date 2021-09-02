import { useEffect } from 'react'
import { auth } from '../../infra/services/authService'

export function Logout() {  
  useEffect(() => {
    (async () => {
      auth.logout()
    })()
  }, [])
  window.location = '/' as unknown as Location
  return null
}
