import React, { ButtonHTMLAttributes } from 'react'

import { StyledButton } from './button'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | undefined
 }

 

export function CancelButton(props: Props) {
  const { label, className, type } = props
  
  return (
    <StyledButton
      {...props}
      data-cy={label?.toLowerCase()}
      disabled={false}
      type={type}      
      className={className}      
    >
      {label}
    </StyledButton>
  )
}
CancelButton.defaultProps = { 
  className: 'btn btn-secondary',
  type: 'reset',
  label: 'Cancel',
  onClick: () => {    
    history.back()
},  
}

