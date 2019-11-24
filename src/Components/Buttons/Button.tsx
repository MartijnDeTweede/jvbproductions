import React from 'react';
import './Button.css';

export enum ButtonColors {
  gray = "gray"
}

interface Button {
  text: string;
  onClick: () => void;
  colour: ButtonColors
}

export const Button: React.FC<Button> = ({
  onClick,
  text,
}) => {
  return (
    <button className="Button" onClick={() => onClick() }>
    {text}
  </button>
  );
}
