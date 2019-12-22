import React from 'react';
import './Button.css';
import classNames from 'classnames';

export enum ButtonColors {
  Gray = "Gray",
  Green = "Green"
}

interface Button {
  text: string;
  onClick: () => void;
  colour: ButtonColors
  large?: boolean;
  noMargin?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<Button> = ({
  onClick,
  text,
  large = false,
  noMargin = false,
  colour,
  disabled = false,
}) => {
  return (
    <button className={classNames(`Button Button--${colour}`, {
      "Button--large": large,
      "Button--noMargin": noMargin,
    })}
    onClick={() => onClick()}
    disabled={disabled}
    >
    {text}
  </button>
  );
}
