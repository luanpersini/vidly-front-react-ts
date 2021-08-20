import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | undefined
 }

export function CancelButton(props: Props) {
  const { label, className, type } = props
  
  return (
    <button
      {...props}
      disabled={false}
      type={type}      
      className={className}      
    >
      {label}
    </button>
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

