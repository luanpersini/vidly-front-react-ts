import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../infra/services/authService'

export function Logout() {
  const history = useHistory()
  useEffect(() => {
    (async () => {
      auth.logout()
    })()
  }, [])
  window.location = '/' as unknown as Location
  return null
}
