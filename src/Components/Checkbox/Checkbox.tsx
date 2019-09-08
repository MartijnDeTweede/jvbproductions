import React from 'react';
import './Checkbox.css'


export const Checkbox: React.FC<{
  text: string;
  value: string;
  onClick: (value: any) => void;
  checked: boolean,
}> = ({text, onClick, value, checked}) =>{
  return(
    <div className="checkBox__container">
      <input id={text} type="checkbox" onClick={() => onClick(value)} value={value} checked={checked}/> 
      <label htmlFor={text} className="checkBox__text">
          {text}
      </label>
    </div>
  )
}


