import React from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';

const sideMenuProps = {
  categories: [
    {
      name: 'jazz',
      menuItems: [
        {
          name: 'Blues minor',
          linkToVideo: 'lalalalala',
          artist: 'Miles Davis',
        },
      ],
    },
    {
      name: 'Funk',
      menuItems: [
        {
          name: 'Baby love',
          linkToVideo: 'lalalalala',
          artist: 'Mothers Finest',
        },
      ],
    },
  ],
};

export const PaidAccessContainer: React.FC = () => {
  const content = 'Deze pagina is betaald';
  return <ClassRoom sideMenuProps={sideMenuProps} content={content} />;
};
