import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../../infra/services/authService'
import { UserJwtParams } from '../../interfaces'

export function AuthRoute(props: any) {
  const { children } = props
  const previousLocation = props.from
  const [user, setUser] = useState<UserJwtParams>({name: ''})

  
  useEffect(() => {
    (async () => {
        auth.getCurrentUser()
        .then((user:any) =>{
            setUser(user)
        })
        .catch((err) => { console.log(err);
        })
        })()
  }, [])


if (!user || Object.keys(user).length === 0) {
    console.log('Unauthorized, redirecting.')

    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: previousLocation }
        }}
      />
    )
  } else {
    return <>{children}</>
  }    
}
