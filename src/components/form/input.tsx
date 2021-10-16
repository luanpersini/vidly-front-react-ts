/* eslint-disable @typescript-eslint/ban-types */

import React, { InputHTMLAttributes } from 'react';

import { ErrorMessage } from './error-message';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | undefined
  errors?: any[]    
  inputvalue?: any
}
// inputvalues?: any | undefined
export function Input(props: Props) {
  const { name, errors, id, label, type, className, placeholder, inputvalue } = props  
  
  const labelName = label === undefined ? name : label   
  return (
    <div className="form-group">
      <label htmlFor={name}>{labelName}</label>
       
      <input
        {...props}
        name={name}
        data-cy={name}
        type={type}
        value={inputvalue === undefined ? '' : inputvalue[name]}
        id={id === undefined ? name : id}
        placeholder={placeholder === undefined ? `Enter ${labelName}...` : placeholder}
        className={className}
      />
      
     <ErrorMessage name={name} errors={errors}/>
    </div>
  )
}
Input.defaultProps = {
  type: 'text',
  className: 'form-control',
  placeholder: undefined
  // inputValues: undefined
}

