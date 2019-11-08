import React from 'react';
import { Exercise } from "../../Containers/excersise";
import './ExerciseAdminBlock.css';

export const ExerciseAdminBlock: React.FC<{exercise: Exercise, onClick: () => void}> = ({exercise, onClick}) => {
  return(
    <div className="ExerciseAdminBlock" onClick={onClick}>
      {exercise.exerciseName} 
    </div>
  )
}