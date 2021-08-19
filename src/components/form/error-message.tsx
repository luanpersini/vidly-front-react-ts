/* eslint-disable @typescript-eslint/ban-types */
import CSS from 'csstype';
import React from 'react';


interface ErrorProps {
  name: string
  errors: ErrorParams[] | undefined
}
interface ErrorParams {
  name: string
  message: string
}

const style: CSS.Properties = {
  marginTop: '1px'
};
export function ErrorMessage({ errors, name }: ErrorProps) {  
  const result = errors?.reduce(function(map: any, obj: ErrorParams) {
      map[obj.name] = obj.message;
      return map;
  }, {});
 
    if(result[name]) {      
      return <div style={style} className="alert alert-danger">{result[name]}</div>
    }
    return null
  }
  

/*
  import CSS from 'csstype';
import React, { useEffect } from 'react';

interface ErrorProps {
  name: string
  errors?: any[]
}

const style: CSS.Properties = {
  marginTop: '1px'
};

export function ErrorMessage({ errors, name }: ErrorProps) {
  const [error, setError] = React.useState<string | undefined>()

  useEffect(() => {
    if (errors !== undefined) {
      Object.keys(errors).forEach((key: any) => {
        if (name === errors[key].name) {
          setError(errors[key].message)
          console.log('value' + error)
        }
      })
    }
  }, [error])

  if (error !== undefined) {
    return <div style={style} className="alert alert-danger">{error}</div>
  } else {
    return null
  }
}
*/