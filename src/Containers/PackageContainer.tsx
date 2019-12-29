import React, {useState, useEffect } from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import {  Package } from './Package';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import { requestAccesToVideo, getAllPackages, buyResourceAccess, GetExcersisesForPackage } from '../Helpers/ApiHelpers';
import { UserInfo } from '../Components/userInfo.types';
import { PackageMenuContainer } from './PackageMenuContainer';
import { defaultFilters, Filter, FilterValue } from './filters';
import { SideMenuControlPanel } from '../Components/SideMenuControlPanel/SideMenuControlPanel';
import classNames from 'classnames';
import { Exercise } from './excersise';
import { SideMenuButton } from '../Components/Buttons/SideMenuButton';


import './PackageContainer.css';
import { Wrapper } from '../Components/Wrapper/Wrapper';

export const updateValueForFilter = (filter: Filter, value: string): Filter => {
  return ({
    ...filter,
    values: filter.values.reduce((newValues: FilterValue[], currentVale: FilterValue) => {
      return currentVale.value === value ? [...newValues, {...currentVale, active:!currentVale.active}] : [...newValues, currentVale]
    }, [])
  })
}

export const filterLessons = (lessonData: Package[], filters: Filter[]) : Package[] => {
  const relevantFilters = filters.filter(filter => filter.values.some(value => !value.active));

  if(relevantFilters.length === 0) {
    return lessonData;
  }

  const newLessonData = relevantFilters.reduce((filteredLessonData: Package[], currentFilter: Filter) => {
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
  NotSelected = 'NotSelected'
}

export const PackageContainer: React.FC<{
  user: firebase.User | undefined
  signInWithGoogle: () => void,
  setUserInfo: (userInfo: UserInfo) => void,
}> = ({
  user,
  signInWithGoogle,
  setUserInfo,
}) =>  {

  const [lessonData, setLessonData] = useState<Package[]>([]);
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [lessonState, setLessonState] = useState<LessonStates>(LessonStates.NotSelected);
  const [selectedLesson, setSelectedLesson] = useState<Package | undefined>(undefined);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(undefined);
  const [selectedLessonSource, setSelectedVideoSource] = useState<Source [] | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<Filter[]>(defaultFilters);
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    getAllPackages().then(data => {
      setLessonData(data);
      setIsLoading(false);
    }).catch(() => {
        setIsLoading(false);
       setLessonState(LessonStates.Error)
    });
    setIsLoading(false);
    fillStateFromStorage();
  }, [])

  const fillStateFromStorage = () => {
    const lessonState= localStorage.getItem("lessonPlayer_lessonState");
    switch(lessonState) {
      case LessonStates.Play: {
        setLessonState(LessonStates.Play);
        break;
      };
      case LessonStates.Error: {
        setLessonState(LessonStates.Error);
        break;
      };
      case LessonStates.Login: {
        setLessonState(LessonStates.Login);
        break;
      };
      case LessonStates.NotSelected: {
        setLessonState(LessonStates.NotSelected);
        break;
      };
      case LessonStates.Buy: {
        setLessonState(LessonStates.Buy);
        break;
      };
      default: {
        setLessonState(LessonStates.NotSelected);
        break;
      }
    }
    
    const selectedLesson = localStorage.getItem("lessonPlayer_selectedLesson");
    if(selectedLesson) {
      setSelectedLesson(JSON.parse(selectedLesson));
    }
    const selectedExercise = localStorage.getItem("lessonPlayer_selectedExercise");
    if(selectedExercise) {
      setSelectedExercise(JSON.parse(selectedExercise));
    }

    const selectedResource = localStorage.getItem("lessonPlayer_selectedVideoSource");
    if(selectedResource) {
      setSelectedVideoSource(JSON.parse(selectedResource));
    }
  }

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
      localStorage.setItem("lessonPlayer_lessonState", LessonStates.Play);
      setSelectedVideoSource(selectedVideoSource);
      localStorage.setItem("lessonPlayer_selectedVideoSource", JSON.stringify(selectedVideoSource));

    })).catch((error) =>{
      if(error.code === "storage/unauthorized") {
        setLessonState(LessonStates.Login);
        localStorage.setItem("lessonPlayer_lessonState", LessonStates.Login);
      } else {
        setLessonState(LessonStates.Error);
        localStorage.setItem("lessonPlayer_lessonState", LessonStates.Error);
      }
    });
  }

  const getImageLink = async (imageName: string): Promise<string | void> => {
    return await storage.child(imageName).getDownloadURL().then((link => {
        return link;

      })).catch((error) =>{
        if(error.code === "storage/unauthorized") {
          setLessonState(LessonStates.Login);
          localStorage.setItem("lessonPlayer_lessonState", LessonStates.Login);
        } else {
          setLessonState(LessonStates.Error);
          localStorage.setItem("lessonPlayer_lessonState", LessonStates.Error);
        }
      });
  }
  
  const getExersiseData = (selectedLesson: string) => {
      GetExcersisesForPackage(selectedLesson).then(data => {
      setExerciseData(data);
      setIsLoading(false);
    });
  }
  
  const handleRequestingResourceAccess = async (itemToAcces: string, onSuccess: () => void) =>{
    if(!user) {
      setLessonState(LessonStates.Login);
      localStorage.setItem("lessonPlayer_lessonState", LessonStates.Login);
      return;
    }
    const resonse = user && await requestAccesToVideo(user.uid, itemToAcces);
    
    if(resonse && resonse.status === 'Allowed') {
      onSuccess()
    } else if(resonse &&  resonse.status === 'NotBought') {
      setLessonState(LessonStates.Buy)
      localStorage.setItem("lessonPlayer_lessonState", LessonStates.Buy);
    } else {
      setLessonState(LessonStates.Error)
      localStorage.setItem("lessonPlayer_lessonState", LessonStates.Error);
    }
  }

  const selectExercise = async (exercise: Exercise) => {
    setSelectedExercise(exercise);
    localStorage.setItem("lessonPlayer_selectedExercise", JSON.stringify(exercise));
    const itemToAcces = `${exercise.lessonName}-${exercise.exerciseName}`;
    await handleRequestingResourceAccess(itemToAcces, () => loadExercise(exercise))
  }

  const handleBackToLessons = () => {
    setSelectedLesson(undefined);
    localStorage.removeItem("lessonPlayer_selectedLesson");
    setSelectedExercise(undefined);
    localStorage.removeItem("lessonPlayer_selectedExercise");
    setLessonState(LessonStates.NotSelected);
    localStorage.setItem("lessonPlayer_lessonState", LessonStates.NotSelected);
  }

  const selectLesson = async (lesson: Package) => {
    getExersiseData(lesson.song.title);
    localStorage.setItem("lessonPlayer_selectedLesson", JSON.stringify(lesson));
    handleRequestingResourceAccess(lesson.song.title, () => setSelectedLesson(lesson))
  };

    return (
      <div>
        {
          isLoading ?
          null :
          <div>
          <div onClick={() => setOpenSideMenu(!openSideMenu)} className="PackageContainer__showSideMenuButton">
          <SideMenuButton
            onClick={() =>setOpenSideMenu(!openSideMenu)} 
            openSideMenu
            openedText="Open menu"
            closedText="Close menu"
          />
          </div>
          <Wrapper>
            <div className={classNames({ "PackageContainer__child": !openSideMenu})}>
              <SideMenuControlPanel updateFilters={updateFilters} activeFilters={activeFilters} />
            </div>
            <div className={classNames({
              "PackageContainer__child": openSideMenu
            })}>
              {
              lessonState === LessonStates.NotSelected ?
              <PackageMenuContainer
                selectLesson={selectLesson}
                selectExercise={selectExercise}
                selectedLesson={selectedLesson}
                lessonData={filterLessons(lessonData, activeFilters)}
                exerciseData={exerciseData}
                handleBackButton={handleBackToLessons}
                getImageLink={ async (imageName) =>  {
                  const linkInFirst = await getImageLink(imageName);
                  return linkInFirst;
                }}
              /> :
              <ClassRoom
                lessonState={lessonState}
                selectedLesson={selectedLesson}
                selectedExercise={selectedExercise}
                selectedLessonSource={selectedLessonSource}
                signInWithGoogle={signInWithGoogle}
                handleBackButton={handleBackToLessons}
                buyLesson={ async () => {
                  if(selectedLesson && user) {
                    const itemToBuy = selectedExercise ? `${selectedExercise.lessonName}-${selectedExercise.exerciseName}` : selectedLesson.song.title;
                    await buyResource(user.uid, itemToBuy, setUserInfo)
                  }
                }}
              />
              }
            </div>
          </Wrapper>    
        </div>
        }
    </div>   
    )
};
