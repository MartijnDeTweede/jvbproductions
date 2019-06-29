import React from 'react';
import { SideMenu } from '../Components/SideMenu/SideMenu';

export const FreeAccessContainer: React.FC = () => {
  const sideMenuProps = {
    categories: [
      {
        name: 'blues',
        menuItems: [{ name: 'Still got the blues', linkToVideo: 'lalalalala' }],
      },
    ],
  };
  return (
    <div>
      <header>Deze content is gratis</header>
      <SideMenu {...sideMenuProps} />
    </div>
  );
};
