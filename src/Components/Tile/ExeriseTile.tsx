import React, { useState, useEffect } from 'react';

import './Tile.css'
import { Exercise } from '../../Containers/excersise';

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
    <div className="tile" onClick={() => selectExercise(exercise)}>
      {
        imageLink ? 
        <img src={imageLink} alt={altText} className="tile__imageHolder"/> :
        <div className="tile__imageHolder"></div> 
      }
      <div className="tile__cost">{cost === 0 ? "Gratis" : `${cost} Credits`}</div>
      <div className="tile__detailInfoHolder">
        <div className="tile__detailInfo">{exerciseName}</div>
        <div className="tile__detailInfo">{category}</div>
        <div className="tile__detailInfo">{difficulty}</div>
      </div>
  </div>
  )
}