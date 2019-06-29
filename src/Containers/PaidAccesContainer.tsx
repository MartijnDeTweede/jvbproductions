import React from 'react';
import { SideMenu } from '../Components/SideMenu/SideMenu';

export const PaidAccessContainer: React.FC = () => {
  const sideMenuProps = {
    categories: [
      {
        name: 'jazz',
        menuItems: [{ name: 'Blues minor', linkToVideo: 'lalalalala' }],
      },
    ],
  };
  return (
    <div>
      <header>Deze content is betaald</header>
      <SideMenu {...sideMenuProps} />
    </div>
  );
};
