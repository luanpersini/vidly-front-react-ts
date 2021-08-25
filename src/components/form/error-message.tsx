/* eslint-disable @typescript-eslint/ban-types */
import CSS from 'csstype';
import React from 'react';

interface ErrorProps {
  name: any
  errors: string[] | undefined
}
interface ErrorParams {
  name: string
  message: string
}

const style: CSS.Properties = {
  marginTop: '1px'
};
export function ErrorMessage({ errors, name }: ErrorProps) {  
  // const result = errors?.reduce(function(map: any, obj: ErrorParams) {
  //     map[obj.name] = obj.message;
  //     return map;
  // }, {});
 
    if(errors && errors[name]) {      
      return <div style={style} className="alert alert-danger">{errors[name]}</div>
    }
    return null
  }
  