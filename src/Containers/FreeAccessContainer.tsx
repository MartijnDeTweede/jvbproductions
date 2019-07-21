import React from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { getLessonsByLessonType, populateCategories } from './categoryHelpers';
import { LessonTypes, lessonsSet, MusicTypes } from './lessons';


export const FreeAccessContainer: React.FC = () => {
  let populatedCategories = populateCategories(Object.keys(MusicTypes),getLessonsByLessonType(lessonsSet, LessonTypes.Free));
  const content = 'Deze pagina is gratis';
  return <ClassRoom categories={populatedCategories} content={content} />;
};
