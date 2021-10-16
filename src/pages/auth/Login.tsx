import * as Yup from 'yup'

import { Button, Input } from '../../components/form'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { FormSubmitErrorMessage } from '../../components/form/form-submit-error-message'
import { Page } from '../../interfaces'
import { Title } from '../../components/template'
import { Validate } from '../../infra/validation/validate-factory'
import { auth } from '../../infra/services/authService'

export function Login(props: Page) {
  const validate = Validate()
  const history = useHistory()
  const location = useLocation()

  const [errors, setErrors] = React.useState<any[]>([])
  const [submitErrors, setSubmitErrors] = React.useState<string | undefined>(undefined)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const validationSchema: any = {
    email: Yup.string().required().max(80).email().label('Email'),
    password: Yup.string().required().min(5).max(25).label('Password')
  }

  async function handleChange({ currentTarget: input }: any) {
    setSubmitErrors(undefined)
    const formData: any = { ...data }
    const { name, value } = input
    formData[name] = value
    setData(formData)

    const errorsFound = { ...errors }
    const errorMessage = await validate.One(name, value, validationSchema)

    if (errorMessage) {
      errorsFound[input.name] = errorMessage
    } else delete errorsFound[input.name]
    setErrors(errorsFound)   
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
   
    let previousLocation = undefined

    if (location.state !== null) {
      const { from }: any = location.state
      if (from !== undefined) {
        previousLocation = from
      }
    }

    try {
      await auth.login(data.email, data.password)
      if (previousLocation !== '/login' && previousLocation !== undefined) {
        window.location = previousLocation as unknown as Location
      } else {
        window.location = '/' as unknown as Location
      }
    } catch (error: any) {
      setSubmitErrors(error.message)
    }
  }
  async function getCurrentUser() {
    return await auth.getCurrentUser()
  }
  getCurrentUser().then((user) => {
    if (user) history.replace('/')
  })
  return (
    <div>
      <Title title={props.title} />
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email"
          errors={errors}
          onChange={handleChange}
          inputvalue={data}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          errors={errors}
          onChange={handleChange}
          inputvalue={data}
        />
        <FormSubmitErrorMessage submitErrors={submitErrors} />
        <Button type="submit" label="Login" />
      </form>
    </div>
  )
}
