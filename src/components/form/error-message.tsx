/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

interface ErrorProps {
  name: any
  errors: string[] | undefined
}

export function ErrorMessage({ errors, name }: ErrorProps) {     
    if(errors && errors[name]) {      
      return <div className="alert alert-danger">{errors[name]}</div>
    }
    return null
  }
  