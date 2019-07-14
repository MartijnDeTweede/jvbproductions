import React from   'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { LessonTypes,  lessonsSet, MusicTypes } from './lessons';
import { getLessonsByLessonType, populateCategories } from './categoryHelpers';


export const PaidAccessContainer: React.FC = () => {
  let populatedCategories = populateCategories(Object.keys(MusicTypes),getLessonsByLessonType(lessonsSet, LessonTypes.Charged));
  const content = 'Deze pagina is betaald';
  return <ClassRoom categories={populatedCategories} content={content} />;
};
