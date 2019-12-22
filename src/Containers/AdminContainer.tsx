
import React, {useState, useEffect } from 'react';
import { Package } from './Package';
import { getAllPackages, submitAddPackage, submitUpdatePackage, submitDeletePackage, PackageWithCredentials, ExerciseWithCredentials, submitAddExercise, GetExcersisesForPackage, submitUpdateExercise, submitDeleteExercise } from '../Helpers/ApiHelpers';
import { PackageList } from '../Components/LessonList/PackageList';
import './AdminContainer.css';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import { AddPackageContainer } from './AddPackageContainer';
import { ManipulatePackageContainer } from './ManipulatePackageContainer';
import { Wrapper } from '../Components/Wrapper/Wrapper';
import { Exercise } from './excersise';
import { AddExerciseContainer } from './AddExerciseContainer';
import { ManipulateExercise } from './ManipulateExerciseContainer';

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
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(undefined);
  const [adminMenuState, setAdminMenuState] = useState<AdminMenuState>(AdminMenuState.SelectLesson);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSuccessfullGetLessonData = (data: Package[]) => {
    setLessonData(data);
    setIsLoading(false);
  }

const handleSuccessFullGetExerciseData = (data: Exercise[]) => {
  setExerciseData(data);
  setIsLoading(false);
}

  const handleFailedGetData = () => {
    setIsLoading(false);
    setAdminMenuState(AdminMenuState.Error)
  }

  useEffect(() =>{
    getAllPackages().then(data => {
      handleSuccessfullGetLessonData(data)
    }).catch(() => {
      handleFailedGetData()
    });
    setIsLoading(false);
  }, [])

  const handlePackageManipulation = (payload: Package, callBack: (payLoadAndCredentials: PackageWithCredentials) => Promise<Package[]>) => {
    setIsLoading(true);
    if(!user || !user.user) {
      handleFailedGetData();
      return; 
    }
    const payLoadAndCredentials = {package: payload, userId: user.user.uid}
    callBack(payLoadAndCredentials).then(data => {
      handleSuccessfullGetLessonData(data)
      setAdminMenuState(AdminMenuState.SelectLesson)
    }).catch(() => {
      handleFailedGetData()
    });
  }

  const handleExerciseAPICall = (payload: Exercise, callBack: (payLoadAndCredentials: ExerciseWithCredentials) => Promise<Exercise[]>) => {
    setIsLoading(true);
    console.log('payload: ', payload);
    if(!user || !user.user) {
      handleFailedGetData();
      return; 
    }
    const payLoadAndCredentials = {exercise: payload, userId: user.user.uid}
    callBack(payLoadAndCredentials).then(data => {
      handleSuccessFullGetExerciseData(data)
      setAdminMenuState(AdminMenuState.ManipulateLesson)
    }).catch(() => {
      handleFailedGetData()
    });
  }

  return(
    <Wrapper>
      <div>
        <Button text="Pakket toevoegen" colour={ButtonColors.Gray} onClick={() => {
          setAdminMenuState(AdminMenuState.AddLesson)
        }} />
        <PackageList lessonData={lessonData} selectLesson={(selectedLesson) => {
          setSelectedLesson(selectedLesson);
          GetExcersisesForPackage(selectedLesson.song.title).then(data => {
            setExerciseData(data);
            setAdminMenuState(AdminMenuState.ManipulateLesson)
            setIsLoading(false);
          }).catch(() => {
            setIsLoading(false);
            setAdminMenuState(AdminMenuState.ManipulateLesson);
          });
        }}/>
      </div>
      <div>
          {adminMenuState === AdminMenuState.SelectLesson && <div>Selecteer een pakket.</div>}
          {adminMenuState === AdminMenuState.AddLesson && <AddPackageContainer submitAddLesson={(payload: Package) => handlePackageManipulation(payload, submitAddPackage)}/>}
          {adminMenuState === AdminMenuState.ManipulateLesson && selectedLesson && 
            <ManipulatePackageContainer
              submitDeleteLesson={() => handlePackageManipulation(selectedLesson, submitDeletePackage)}
              submitUpdateLesson={(payload: Package) => handlePackageManipulation(payload, submitUpdatePackage)}
              selectedLesson={selectedLesson}
              setErrorState={() => setAdminMenuState(AdminMenuState.Error)}
              setAddExercise={() => setAdminMenuState(AdminMenuState.AddExcercise)}
              exerciseData={exerciseData}
              setSelectedExercise={(exercise: Exercise) => {
                setSelectedExercise(exercise);
                setAdminMenuState(AdminMenuState.ManipulateExercise);
              }} 
            />
            }
            {adminMenuState === AdminMenuState.AddExcercise && selectedLesson &&
              <AddExerciseContainer
                selectedLessonName={selectedLesson.song.title}
                submitAddExercise={(payload: Exercise) => handleExerciseAPICall(payload, submitAddExercise)}
              />
            }
            {adminMenuState === AdminMenuState.ManipulateExercise && selectedLesson && selectedExercise &&
              <ManipulateExercise
                selectedLessonName={selectedLesson.song.title}
                submitUpdateExercise={(payload: Exercise) => handleExerciseAPICall(payload, submitUpdateExercise)}
                submitDeleteExercise={() => handleExerciseAPICall(selectedExercise, submitDeleteExercise)}
                selectedExercise={selectedExercise}
              />
            }


          {adminMenuState === AdminMenuState.Error && <div>Er is iets fout gegaan, ververs de pagina.</div>}
      </div>      
    </Wrapper>
  )
}