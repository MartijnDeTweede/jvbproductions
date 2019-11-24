import React from 'react';
import './Wrapper.css';

export const Wrapper: React.FC<{}> = ({children}) => {
  return (
    <div className="Wrapper">
      {children}
    </div>
  )
}