import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | undefined
}

export function Button(props: Props) {
  const { label, className } = props

  return (
    <button {...props} disabled={false} className={className}>
      {label}
    </button>
  )
}
Button.defaultProps = {  
  className: 'btn btn-primary'
}
