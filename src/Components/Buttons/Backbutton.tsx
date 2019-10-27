import React from 'react';
import './Backbutton.css';

interface BackButtonProps {
  text: string;
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <button className="Backbutton" onClick={() => onClick() }>
    {text}
  </button>
  );
}
