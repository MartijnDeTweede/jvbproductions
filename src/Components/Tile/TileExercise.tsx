import React from 'react';

import './Tile.css'
import { Exercise } from '../../Containers/excersise';

export const ExerciseTile: React.FC<{
  exercise: Exercise
  selectExercise: (lesson: Exercise) => void;
}> = ({
  exercise,
  selectExercise
}) => {

  const {
    exerciseName,
    category,
    cost,
    difficulty,
  } = exercise;

  return(
    <div className="tile" onClick={() => selectExercise(exercise)}>
      <div className="tile__imageHolder"></div>
      <div className="tile__detailInfoHolder">
      <div className="tile__detailInfo">{category}</div>
        <div className="tile__detailInfo">{exerciseName}</div>
        <div className="tile__detailInfo">{cost} credits</div>
        <div className="tile__detailInfo"> Moeilijkheidsgraad: {difficulty}</div>
        <div className="tile__detailInfo">{cost} credits</div>
      </div>
  </div>
  )
}