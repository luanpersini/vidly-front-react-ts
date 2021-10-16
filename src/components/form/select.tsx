/* eslint-disable @typescript-eslint/ban-types */
import React, { SelectHTMLAttributes } from 'react';

import { ErrorMessage } from './error-message';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string | undefined
  errors?: any[]
  options: any[]
  inputvalue?: any
}

export function Select(props: Props) {
  const { name, errors, id, label, className, options, inputvalue } = props

  const labelName = label === undefined ? name : label
   
  return (
    <div className="form-group">
      <label htmlFor={name}>{labelName}</label>

      <select
        {...props}
        name={name}
        data-cy={name}
        id={id === undefined ? name : id}
        className={className}
        value={inputvalue === undefined ? '' : inputvalue[name]}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id} >
            {option.name}
          </option>
        ))}
      </select>

      <ErrorMessage name={name} errors={errors} />
    </div>
  )
}
Select.defaultProps = {
  className: 'form-control',
  placeholder: undefined
}
