import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | undefined
}
export const StyledButton = styled.button`
  :not(:first-child){
    margin-left:5px
  }  
`

export function Button(props: Props) {
  const { label, className } = props

  return (
    <StyledButton {...props} disabled={false} className={className}>
      {label}
    </StyledButton>
  )
}
Button.defaultProps = {  
  className: 'btn btn-primary'
}
