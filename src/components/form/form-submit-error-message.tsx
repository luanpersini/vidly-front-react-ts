/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

export interface FormSubmitErrorProps {
  submitErrors: string | undefined
}

export function FormSubmitErrorMessage({ submitErrors }: FormSubmitErrorProps) {     
    if(submitErrors) {      
      return <div className="alert alert-danger">{submitErrors}</div>
    }
    return null
  }
  