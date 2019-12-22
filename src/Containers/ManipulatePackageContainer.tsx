import React, { useState } from 'react';
import { PackageForm } from '../Components/PackageForm/PackageForm';
import { Package } from './Package';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import Modal from 'react-modal';
import { Exercise } from './excersise';
import { ExerciseAdminBlock } from '../Components/ExerciseAdminBlock/ExerciseAdminBlock';

export const ManipulatePackageContainer: React.FC<{
  submitUpdateLesson: (payload: Package) => void
  submitDeleteLesson: () => void
  selectedLesson: Package,
  setSelectedExercise: (exercise: Exercise) => void;
  setAddExercise: () => void;
  setErrorState: () => void;
  exerciseData: Exercise[];
}> = ({
  submitUpdateLesson,
  selectedLesson,
  submitDeleteLesson,
  setSelectedExercise,
  setAddExercise,
  exerciseData,
}) => {

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  return(
  <div>
    <div>Verwijder het geselecteerde pakket</div>
    <Button
      text="Verwijder pakket"
      onClick={() => setDeleteModalOpen(true)}
      colour={ButtonColors.Gray}
    />
    <div>Pas een pakket aan.</div>
    <PackageForm submit={(payload: Package) => submitUpdateLesson(payload)} selectedLesson={selectedLesson} />
    <div>Dit pakket bevat de volgende oefeningen</div>
    {
      exerciseData.map(exercise => < ExerciseAdminBlock exercise={exercise} onClick={() => setSelectedExercise(exercise)}/>)
    }

    <Button text="Voeg oefening toe" onClick={() => setAddExercise()} colour={ButtonColors.Gray}/>

    <Modal isOpen={deleteModalOpen}>
      Weet je zeker dat je deze les wilt verwijderen. Verwijderde lessen kunnen niet meer terug gehaald worden.
      <div>
      <Button text="Verwijder les" onClick={() => submitDeleteLesson()} colour={ButtonColors.Gray}/>
      <Button text="Nee" onClick={() => setDeleteModalOpen(false)} colour={ButtonColors.Gray}/>        
      </div>
    </Modal>
  
  </div>
  )
}