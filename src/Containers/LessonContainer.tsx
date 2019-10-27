import React, {useState, useEffect, useCallback} from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import {  LessonNew } from './lessons';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import './LessonContainer.css';
import { requestAccesToVideo, getAllLessons, buyResourceAccess, getExcersisesForLesson } from '../Helpers/ApiHelpers';
import { UserInfo } from '../Components/userInfo.types';
import { LessonMenuContainer } from './LessonMenuContainer';
import { defaultFilters, Filter, FilterValue } from './filters';
import { SideMenuControlPanel } from '../Components/SideMenuControlPanel/SideMenuControlPanel';
import classNames from 'classnames';
import { Exercise } from './excersise';


export const updateValueForFilter = (filter: Filter, value: string): Filter => {
  return ({
    ...filter,
    values: filter.values.reduce((newValues: FilterValue[], currentVale: FilterValue) => {
      return currentVale.value === value ? [...newValues, {...currentVale, active:!currentVale.active}] : [...newValues, currentVale]
    }, [])
  })
}

export const filterLessons = (lessonData: LessonNew[], filters: Filter[]) : LessonNew[] => {
  const relevantFilters = filters.filter(filter => filter.values.some(value => !value.active));

  if(relevantFilters.length === 0) {
    return lessonData;
  }

  const newLessonData = relevantFilters.reduce((filteredLessonData: LessonNew[], currentFilter: Filter) => {
    switch(currentFilter.category) {
      case "Difficulty" : {
        return filteredLessonData.filter(lesson => {
          const currentValue = currentFilter.values.find(value => value.value === lesson.difficulty)
          return currentValue ? currentValue.active : true;
        });
      }
      case "Category" : {
        return filteredLessonData.filter(lesson => {
          const currentValue = currentFilter.values.find(value => value.value === lesson.category)
          return currentValue ? currentValue.active : true;
        });
      }
      default: {
        break;
      }
    }
    return filteredLessonData;
  }, lessonData);

  return newLessonData;
}

export const buyResource = async (
  userId: string, 
  resource: string,
  updateUserInfo: (userInfo: UserInfo) => void) =>{
  const userInfo = await buyResourceAccess(userId, resource);
  updateUserInfo(userInfo);
}

export enum LessonStates {
  Play = 'Play',
  Login = 'Login',
  Error = 'Error',
  Buy = 'Buy',
  NotSelected = 'Not Selected'
}

export const LessonContainer: React.FC<{
  user: firebase.User | undefined
  signInWithGoogle: () => void,
  setUserInfo: (userInfo: UserInfo) => void,
}> = ({
  user,
  signInWithGoogle,
  setUserInfo,
}) =>  {

  const [lessonData, setLessonData] = useState<LessonNew[]>([])
  const [exerciseData, setExerciseData] = useState<Exercise[]>([])
  const [lessonState, setLessonState] = useState<LessonStates>(LessonStates.NotSelected);
  const [selectedLesson, setSelectedLesson] = useState<LessonNew | undefined>(undefined);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(undefined);
  const [selectedLessonSource, setSelectedVideoSource] = useState<Source [] | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<Filter[]>(defaultFilters);
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    getAllLessons().then(data => {
      setLessonData(data);
      setIsLoading(false);
    }).catch(() => {
        setIsLoading(false);
       setLessonState(LessonStates.Error)
    });
    setIsLoading(false);
  }, [])


  const updateFilters = (category: string, newValue: string) => {
    const newFilters = activeFilters.reduce((accumulatedFilters: Filter[], currentFilter: Filter) => {
      return currentFilter.category === category ? [...accumulatedFilters, updateValueForFilter(currentFilter, newValue)] : [...accumulatedFilters, currentFilter]
    }, []);

    setActiveFilters(newFilters)
  }

  const loadExercise = (exercise: Exercise) => {
    storage.child(exercise.src).getDownloadURL().then((link => {
      const selectedVideoSource: Source [] = [
        {
          name: `${exercise.lessonName} - ${exercise.exerciseName} `,
          source: [
            {
              source: link,
              type: VideoSourceType.video_mp4
            }
          ]
        }
      ]
      setLessonState(LessonStates.Play)
      setSelectedVideoSource(selectedVideoSource)

      })).catch((error) =>{
        if(error.code === "storage/unauthorized") {
          setLessonState(LessonStates.Login)
        } else {
          setLessonState(LessonStates.Error)
        }
      });
  }

  const getExersiseData = (
    selectedLesson: string,

    ) => {
      getExcersisesForLesson(selectedLesson).then(data => {
      setExerciseData(data);
      setIsLoading(false);
    });
  }
  
  const handleRequestingResourceAccess = async (itemToAcces: string, onSuccess: () => void) =>{
    if(!user) {
      setLessonState(LessonStates.Login);
      return;
    }


    const resonse = user && await requestAccesToVideo(user.uid, itemToAcces);
    
    if(resonse && resonse.status === 'Allowed') {
      onSuccess()
    } else if(resonse &&  resonse.status === 'NotBought') {
      setLessonState(LessonStates.Buy)
    } else {
      setLessonState(LessonStates.Error) 
    }
  }

  const selectExercise = async (exercise: Exercise) => {
    setSelectedExercise(exercise);

    const itemToAcces = `${exercise.lessonName}-${exercise.exerciseName}`;
    await handleRequestingResourceAccess(itemToAcces, () => loadExercise(exercise))
  }

  const handleBackToLessons = () => {
    setSelectedLesson(undefined);
    setSelectedExercise(undefined)
  }

  const selectLesson = async (lesson: LessonNew) => {
    getExersiseData(lesson.song.title);
    handleRequestingResourceAccess(lesson.song.title, () => setSelectedLesson(lesson))
  };

    return (
      <div>
        {
          isLoading ?
          null :
          <div>
          <div onClick={() => setOpenSideMenu(!openSideMenu)} className="LessonContainer__showSideMenuButton">
            {openSideMenu ? 'menu sluiten' : 'Menu openen'} 
          </div>
          <div className="LessonContainer-Wrapper">
            <div className={classNames({
              "LessonContainer__child": !openSideMenu
            })}>
              <SideMenuControlPanel updateFilters={updateFilters} activeFilters={activeFilters} />
            </div>
            <div className={classNames({
              "LessonContainer__child": openSideMenu
            })}>
              {
              lessonState === LessonStates.NotSelected ?
              <LessonMenuContainer
                selectLesson={selectLesson}
                selectExercise={selectExercise}
                selectedLesson={selectedLesson}
                lessonData={filterLessons(lessonData, activeFilters)}
                exerciseData={exerciseData}
                handleBackButton={handleBackToLessons}
              /> :
              <ClassRoom
                lessonState={lessonState}
                selectedLesson={selectedLesson}
                selectedExercise={selectedExercise}
                selectedLessonSource={selectedLessonSource}
                signInWithGoogle={signInWithGoogle}
                buyLesson={ async () => {
                  if(selectedLesson && user) {
                    const itemToBuy = selectedExercise ? `${selectedExercise.lessonName}-${selectedExercise.exerciseName}` : selectedLesson.song.title;

                    await buyResource(user.uid, itemToBuy, setUserInfo)
                  }
                }}
              />
              }
            </div>
          </div>        
        </div>
        }
    </div>   
    )
};
