import React from 'react';
import { Exercise } from './excersise';
import { ExerciseForm } from '../Components/ExerciseForm/ExerciseForm';


export const AddExerciseContainer: React.FC<{
  submitAddExercise: (payload: Exercise) => void;
  selectedLessonName: string;
}> = ({submitAddExercise, selectedLessonName}) => {
  return(<div>
    <div>Voeg een oefening toe.</div>
    <ExerciseForm selectedLessonName={selectedLessonName} submit={(payload: Exercise) => submitAddExercise(payload)} />
  </div>)
}