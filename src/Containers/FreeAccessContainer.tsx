import React, { useEffect } from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { getLessonsByLessonType, populateCategories } from './categoryHelpers';
import { LessonTypes, lessonsSet, MusicTypes } from './lessons';

const categories = [
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
];

export const FreeAccessContainer: React.FC = () => {
  const paidLessons = getLessonsByLessonType(lessonsSet, LessonTypes.Charged)
  let populatedCategories = populateCategories(Object.keys(MusicTypes),paidLessons);

  const content = 'Deze pagina is gratis';
  return <ClassRoom categories={populatedCategories} content={content} />;
};
