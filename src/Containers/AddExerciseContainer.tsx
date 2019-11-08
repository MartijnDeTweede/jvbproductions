import React from 'react';
import { Exercise } from './excersise';
import { ExerciseForm } from '../Components/ExerciseForm/ExerciseForm';


export const AddExerciseContainer: React.FC<{submitAddExercise: (payload: Exercise) => void}> = (
    {submitAddExercise}
  ) => {
  return(<div>
    <span>Voeg een oefening toe.</span>
    <ExerciseForm submit={(payload: Exercise) => submitAddExercise(payload)} />
  </div>)
}