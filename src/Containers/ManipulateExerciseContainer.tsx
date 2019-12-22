import React, { useState } from 'react';
import { Exercise } from './excersise';
import { ExerciseForm } from '../Components/ExerciseForm/ExerciseForm';
import Modal from 'react-modal';
import { Button, ButtonColors } from '../Components/Buttons/Button';

export const ManipulateExercise: React.FC<{
  submitUpdateExercise: (payload: Exercise) => void
  submitDeleteExercise: () => void
  selectedLessonName: string;
  selectedExercise: Exercise;
}> = ({submitUpdateExercise, selectedLessonName, selectedExercise, submitDeleteExercise}) => {

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  return(
  <div>
    <div>Verwijder de geslecteerde oefening</div>
    <Button
      text="Verwijder oefening"
      onClick={() => setDeleteModalOpen(true)}
      colour={ButtonColors.Gray}
    />
    <div>Pas een oefening aan.</div>
    <ExerciseForm selectedLessonName={selectedLessonName} submit={(payload: Exercise) => submitUpdateExercise(payload)} selectedExercise={selectedExercise}/>
    <Modal isOpen={deleteModalOpen}>
      Weet je zeker dat je deze oefening wilt verwijderen. Verwijderde oefeningen kunnen niet meer terug gehaald worden.
      <div>
      <Button text="Verwijder oefening" onClick={() => submitDeleteExercise()} colour={ButtonColors.Gray}/>
      <Button text="Nee" onClick={() => setDeleteModalOpen(false)} colour={ButtonColors.Gray}/>        
      </div>
    </Modal>
  </div>)
}