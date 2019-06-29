import React from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';

const sideMenuProps = {
  categories: [
    {
      name: 'Blues',
      menuItems: [
        {
          name: 'Still got the blues',
          linkToVideo: 'lalalalala',
          artist: 'Gary Moore',
        },
      ],
    },
    {
      name: 'Rock',
      menuItems: [
        {
          name: 'Sweet Child O Mine',
          linkToVideo: 'lalalalala',
          artist: 'Guns n Roses',
        },
      ],
    },
  ],
};

export const FreeAccessContainer: React.FC = () => {
  const content = 'Deze pagina is gratis';
  return <ClassRoom sideMenuProps={sideMenuProps} content={content} />;
};
