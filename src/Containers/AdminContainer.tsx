
import React, {useState, useEffect } from 'react';
import { Package } from './Package';
import { getAllLessons, submitInsertLesson, submitUpdateLesson, submitDeleteLesson, PackageWithCredentials, ExerciseWithCredentials, submitInsertExercise } from '../Helpers/ApiHelpers';
import { PackageList } from '../Components/LessonList/PackageList';
import './AdminContainer.css';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import { AddPackageContainer } from './AddPackageContainer';
import { ManipulatePackageContainer } from './ManipulatePackageContainer';
import { Wrapper } from '../Components/Wrapper/Wrapper';
import { Exercise } from './excersise';
import { AddExerciseContainer } from './AddExerciseContainer';

export enum AdminMenuState {
  SelectLesson = "SelectLesson",
  AddLesson = 'addLesson',
  ManipulateLesson = 'manipuldateLesson',
  AddExcercise = 'addExercise',
  ManipulateExercise = 'manipulateExercise',
  Error = 'Error'
}

export const AdminContainer: React.FC<{user?: firebase.User}> = (user) => {
  const [lessonData, setLessonData] = useState<Package[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Package | undefined>(undefined);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(undefined);
  const [adminMenuState, setAdminMenuState] = useState<AdminMenuState>(AdminMenuState.SelectLesson);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSuccessfullGetLessonData = (data: Package[]) => {
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

  const handlePackageManipulation = (payload: Package, callBack: (payLoadAndCredentials: PackageWithCredentials) => Promise<Package[]>) => {
    setIsLoading(true);
    if(!user || !user.user) {
      handleFailedGetLessonData();
      return; 
    }
    const payLoadAndCredentials = {package: payload, userId: user.user.uid}
    callBack(payLoadAndCredentials).then(data => {
      handleSuccessfullGetLessonData(data)
      setAdminMenuState(AdminMenuState.SelectLesson)
    }).catch(() => {
      handleFailedGetLessonData()
    });
  }

  const handleExerciseAPICall = (payload: Exercise, callBack: (payLoadAndCredentials: ExerciseWithCredentials) => Promise<Package[]>) => {
    setIsLoading(true);
    if(!user || !user.user) {
      handleFailedGetLessonData();
      return; 
    }
    const payLoadAndCredentials = {exercise: payload, userId: user.user.uid}
    callBack(payLoadAndCredentials).then(data => {
      handleSuccessfullGetLessonData(data)
      setAdminMenuState(AdminMenuState.SelectLesson)
    }).catch(() => {
      handleFailedGetLessonData()
    });
  }

  return(
    <Wrapper>
      <div>
        <Button text="Pakket toevoegen" colour={ButtonColors.gray} onClick={() => {
          setAdminMenuState(AdminMenuState.AddLesson)
        }} />
        <PackageList lessonData={lessonData} selectLesson={(selectedLesson) => {
          setAdminMenuState(AdminMenuState.ManipulateLesson)
          setSelectedLesson(selectedLesson)
        }}/>
      </div>
      <div>
          {adminMenuState === AdminMenuState.SelectLesson && <div>Selecteer een pakket.</div>}
          {adminMenuState === AdminMenuState.AddLesson && <AddPackageContainer submitAddLesson={(payload: Package) => handlePackageManipulation(payload, submitInsertLesson)}/>}
          {adminMenuState === AdminMenuState.ManipulateLesson && selectedLesson && 
            <ManipulatePackageContainer
              submitDeleteSelectedLesson={() => handlePackageManipulation(selectedLesson, submitDeleteLesson)}
              submitUpdateLesson={(payload: Package) => handlePackageManipulation(payload, submitUpdateLesson)}
              selectedLesson={selectedLesson}
              setErrorState={() => setAdminMenuState(AdminMenuState.Error)}
              setAddExercise={() => setAdminMenuState(AdminMenuState.AddExcercise)}
              setSelectedExercise={(ecercise: Exercise) => {
                setAdminMenuState(AdminMenuState.ManipulateExercise);
                setSelectedExercise(ecercise);
              }}
            />
            }
            {adminMenuState === AdminMenuState.AddExcercise && 
              <AddExerciseContainer submitAddExercise={(payload: Exercise) => handleExerciseAPICall(payload, submitInsertExercise)} />
            }
            {adminMenuState === AdminMenuState.ManipulateExercise && selectedExercise && 
              <div>Manipuldate exercise</div>
            }


          {adminMenuState === AdminMenuState.Error && <div>Er is iets fout gegaan, ververs de pagina.</div>}
      </div>      
    </Wrapper>
  )
}