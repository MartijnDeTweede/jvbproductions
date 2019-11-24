import React, { useState, useEffect } from 'react';

import './Tile.css'
import { Exercise } from '../../Containers/excersise';
import { Tile } from './Tile';

export const ExerciseTile: React.FC<{
  exercise: Exercise
  selectExercise: (lesson: Exercise) => void;
  getImageLink: (imageName: string)  => Promise<string | void>;
}> = ({
  exercise,
  selectExercise,
  getImageLink
}) => {

  const {
    exerciseName,
    category,
    cost,
    difficulty,
    image,
    altText,

  } = exercise;

  const [imageLink, setImageLink] = useState<string | undefined>(undefined);

  const handleSetImageLink = (link: string) => setImageLink(link);

  useEffect(() => {
      getImageLink(image).then((link) => {
        if(link) {
          handleSetImageLink(link);
        }
      });
  }
  ,[getImageLink, image])

  return(
    <Tile
      onClick={() => selectExercise(exercise)}
      imageLink={imageLink}
      altText={altText}
      cost={cost}
      title={exerciseName}
      category={category}
      difficulty={difficulty}
     />
  )
}