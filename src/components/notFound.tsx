import React from "react";
import { useHistory, useParams } from 'react-router-dom';
export const NotFound = () => {    
  const history = useHistory()
  const { id: message } = useParams<{ id: string }>()
  console.log('messs --' + message);
  
  return <h1>{message === undefined ? "Page Not Found" : message}</h1>
  
};
