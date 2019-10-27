import React from 'react';
import './Backbutton.css';

interface BackButtonProps {
  handleBackButton: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  handleBackButton,
}) => {
  return (
    <button className="Backbutton" onClick={() => handleBackButton() }>
    Terug naar lessen
  </button>
  );
}
