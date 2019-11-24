import React from 'react';
import './Button.css';
import classNames from 'classnames';

export enum ButtonColors {
  gray = "gray",
  Green = "Green"
}

interface Button {
  text: string;
  onClick: () => void;
  colour: ButtonColors
  large?: boolean;
  noMargin?: boolean;
}

export const Button: React.FC<Button> = ({
  onClick,
  text,
  large = false,
  noMargin = false,
  colour,
}) => {
  return (
    <button className={classNames(`Button Button--${colour}`, {
      "Button--large": large,
      "Button--noMargin": noMargin,
    })} onClick={() => onClick() }>
    {text}
  </button>
  );
}
