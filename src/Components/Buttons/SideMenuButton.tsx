import React from 'react';
import './SideMenuButton.css'

export const SideMenuButton: React.FC<{
  onClick: () => void;
  openSideMenu: boolean;
  openedText: string;
  closedText: string
}> = ({
  onClick,
  openSideMenu,
  openedText,
  closedText,
}
) => {
  return (
    <div onClick={() => onClick()} className="SideMenuButton">
    {openSideMenu ? closedText : openedText} 
  </div>
  );
}