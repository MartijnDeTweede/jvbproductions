
import React, {useState, useEffect } from 'react';
import { LessonNew } from './lessons';
import { Exercise } from './excersise';
import { getAllLessons, submitInsertLesson, submitUpdateLesson, submitDeleteLesson } from '../Helpers/ApiHelpers';
import { LessonList } from '../Components/LessonList/LessonList';
import './AdminContainer.css';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import { AddLessonContainer } from './AddLessonContainer';
import { ManipulateLessonContainer } from './ManipulateLessonContainer';

enum AdminMenuState {
  SelectLesson = "SelectLesson",
  AddLesson = 'addLesson',
  ManipuldateLesson = 'manipuldateLesson',
  AddExcercise = 'addExercise',
  ManipulateExercise = 'manipulateExercise',
  Error = 'Error'
}

export const AdminContainer: React.FC<{}> = () => {
  const [lessonData, setLessonData] = useState<LessonNew[]>([]);
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonNew | undefined>(undefined);
  const [adminMenuState, setAdminMenuState] = useState<AdminMenuState>(AdminMenuState.SelectLesson);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSuccessfullGetLessonData = (data: LessonNew[]) => {
    setLessonData(data);
    setIsLoading(false);
  }

  const handleFailedGetLessonData = () => {
    setIsLoading(false);
    setAdminMenuState(AdminMenuState.Error)
  }

  useEffect(() =>{
    getAllLessons().then(data => {
      handleSuccessfullGetLessonData(data)
    }).catch(() => {
      handleFailedGetLessonData()
    });
    setIsLoading(false);
  }, [])

  const handleAddLesson = (payload: LessonNew) => {
    setIsLoading(true);
    submitInsertLesson(payload).then(data => {
      handleSuccessfullGetLessonData(data)
      setAdminMenuState(AdminMenuState.SelectLesson)
    }).catch(() => {
      handleFailedGetLessonData()
    });
  }

  const handleUpdateLesson = (payload: LessonNew) => {
    setIsLoading(true);
    submitUpdateLesson(payload).then(data => {
      handleSuccessfullGetLessonData(data)
      setAdminMenuState(AdminMenuState.SelectLesson)
    }).catch(() => {
      handleFailedGetLessonData()
    });
  }

  const handleDeleteLesson = () => {
    if(selectedLesson) {
      const lessonName = selectedLesson.song.title;
      setIsLoading(true);
      submitDeleteLesson(lessonName).then(data => {
        handleSuccessfullGetLessonData(data)
        setAdminMenuState(AdminMenuState.SelectLesson)
      }).catch(() => {
        handleFailedGetLessonData()
      });

    }
  }

  return(
    <div className="adminContainer__Wrapper">
      <div>
        <Button text="Pakket toevoegen" colour={ButtonColors.gray} onClick={() => {
          setAdminMenuState(AdminMenuState.AddLesson)
        }} />
        <LessonList lessonData={lessonData} selectLesson={(selectedLesson) => {
          setAdminMenuState(AdminMenuState.ManipuldateLesson)
          setSelectedLesson(selectedLesson)
        }}/>
      </div>
      <div>
          {adminMenuState === AdminMenuState.SelectLesson && <div>Selecteer een pakket.</div>}
          {adminMenuState === AdminMenuState.AddLesson && <AddLessonContainer submitAddLesson={(payload: LessonNew) => handleAddLesson(payload)}/>}
          {adminMenuState === AdminMenuState.ManipuldateLesson && selectedLesson && 
            <ManipulateLessonContainer
              submitDeleteSelectedLesson={() => handleDeleteLesson()}
              submitUpdateLesson={(payload: LessonNew) => handleUpdateLesson(payload)}
              selectedLesson={selectedLesson}
            />
            }
          {adminMenuState === AdminMenuState.Error && <div>Er is iets fout gegaan, ververs de pagina.</div>}
      </div>
    </div>
  )
}