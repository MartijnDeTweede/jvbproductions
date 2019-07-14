import React, { useEffect} from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { LessonTypes, LessonNew, lessonsSet, MusicTypes } from './lessons';
import { getLessonsByLessonType, populateCategories } from './categoryHelpers';

const categories = [
  {
    name: 'jazz',
    menuItems: [
      {
        name: 'Blues minor',
        linkToVideo: 'lalalalala',
        artist: 'Blues minor',
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
];


export const PaidAccessContainer: React.FC = () => {
  const paidLessons = getLessonsByLessonType(lessonsSet, LessonTypes.Charged)
  let populatedCategories = populateCategories(Object.keys(MusicTypes),paidLessons);
  const content = 'Deze pagina is betaald';
  return <ClassRoom categories={populatedCategories} content={content} />;
};
