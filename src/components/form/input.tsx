/* eslint-disable @typescript-eslint/ban-types */
import React, { InputHTMLAttributes } from 'react';
import { ErrorMessage } from './error-message';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | undefined
  errors?: any[]
}

function Input(props: InputProps) {
  const { name, errors, id, label, type, className, placeholder } = props  
  
  const labelName = label === undefined ? name : label   
  return (
    <div className="form-group">
      <label htmlFor={name}>{labelName}</label>

      <input
        {...props}
        name={name}
        type={type}
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
}

export default Input
