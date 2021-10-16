import { auth } from '../../infra/services/authService'
import { useEffect } from 'react'

export function Logout() {  
  useEffect(() => {
    (async () => {
      auth.logout()
    })()
  }, [])
  window.location = '/#' as unknown as Location
  return null
}
