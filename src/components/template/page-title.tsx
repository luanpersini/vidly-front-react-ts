/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface Props {
  title: string
}

export const TitleStyle = styled.h1`
  font-weight: bold;
  font-style: italic;
  border-bottom: 3px solid #ddd;
  margin-bottom: 30px;
  padding-bottom: 3px;  
`

export function Title({ title }: Props) {
  useEffect(() => { document.title = title}, [])
  return <TitleStyle>{title}</TitleStyle>
 
}