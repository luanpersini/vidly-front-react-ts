/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  color?: string
}

export const PageTitle = styled.h1<Omit<Props, 'title'>>`
  font-weight: bold;
  font-style: italic;
  border-bottom: 3px solid #ddd;
  margin-bottom: 30px;
  padding-bottom: 3px;   
`

export function Title({title, ...props}: Props) {
  useEffect(() => { document.title = title}, [])
  return <PageTitle {...props}>{title}</PageTitle>
 
}
