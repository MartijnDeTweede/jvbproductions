import React, { useState, useEffect } from 'react';
import { PackageForm } from '../Components/LessonForm/PackageForm';
import { Package } from './Package';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import Modal from 'react-modal';
import { Exercise } from './excersise';
import { getExcersisesForLesson } from '../Helpers/ApiHelpers';
import { ExerciseAdminBlock } from '../Components/ExerciseAdminBlock/ExerciseAdminBlock';

export const ManipulatePackageContainer: React.FC<{
  submitUpdateLesson: (payload: Package) => void
  submitDeleteSelectedLesson: () => void
  selectedLesson: Package,
  setSelectedExercise: (exercise: Exercise) => void;
  setAddExercise: () => void;
  setErrorState: () => void,
}> = ({
  submitUpdateLesson,
  selectedLesson,
  submitDeleteSelectedLesson,
  setErrorState,
  setSelectedExercise,
  setAddExercise,
}) => {

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    getExcersisesForLesson(selectedLesson.song.title).then(data => {
      setExerciseData(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      setErrorState();
    });
    setIsLoading(false);
  }, [selectedLesson.song.title, setErrorState])

  return(
  <div>
    <div>Verwijder het geselecteerde pakket</div>
    <Button
      text="Verwijder pakket"
      onClick={() => setDeleteModalOpen(true)}
      colour={ButtonColors.gray}
    />
    <div>Pas een pakket aan.</div>
    <PackageForm submit={(payload: Package) => submitUpdateLesson(payload)} selectedLesson={selectedLesson} />
    <div>Dit pakket bevat de volgende oefeningen</div>
    {
      exerciseData.map(exercise => < ExerciseAdminBlock exercise={exercise} onClick={() => setSelectedExercise(exercise)}/>)
    }

    <Button text="Voeg oefening toe" onClick={() => setAddExercise()} colour={ButtonColors.gray}/>

    <Modal isOpen={deleteModalOpen}>
      Weet je zeker dat je deze les wilt verwijderen. Verwijderde lessen kunnen niet meer terug gehaald worden.
      <div>
      <Button text="Verwijder les" onClick={() => submitDeleteSelectedLesson()} colour={ButtonColors.gray}/>
      <Button text="Nee" onClick={() => setDeleteModalOpen(false)} colour={ButtonColors.gray}/>        
      </div>
    </Modal>
  
  </div>
  )
}