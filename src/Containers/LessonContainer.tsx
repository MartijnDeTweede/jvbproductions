import React, {useState, useEffect, useCallback} from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import {  LessonNew } from './lessons';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import './LessonContainer.css';
import { requestAccesToVideo, getAllLessons, buyLessonAccess } from '../Helpers/ApiHelpers';
import { UserInfo } from '../Components/userInfo.types';
import { LessonMenuContainer } from './LessonMenuContainer';
import { defaultFilters, Filter, FilterValue } from './filters';
import { SideMenuControlPanel } from '../Components/SideMenuControlPanel/SideMenuControlPanel';
import classNames from 'classnames';


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

export const buyLesson = async (
  userId: string, 
  lessonName: string,
  updateUserInfo: (userInfo: UserInfo) => void) =>{
  const userInfo = await buyLessonAccess(userId, lessonName);
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
  const [lessonState, setLessonState] = useState<LessonStates>(LessonStates.NotSelected);
  const [selectedLesson, setSelectedLesson] = useState<LessonNew | undefined>(undefined);
  const [selectedLessonSource, setSelectedLessonSource] = useState<Source [] | undefined>(undefined);
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

  const loadLesson = (lesson: LessonNew) => {
    storage.child(lesson.src).getDownloadURL().then((link => {
      const selectedLessonSource: Source [] = [
        {
          name: lesson.song.title,
          source: [
            {
              source: link,
              type: VideoSourceType.video_mp4
            }
          ]
        }
      ]
      setLessonState(LessonStates.Play)
      setSelectedLessonSource(selectedLessonSource)

      })).catch((error) =>{
        if(error.code === "storage/unauthorized") {
          setLessonState(LessonStates.Login)
        } else {
          setLessonState(LessonStates.Error)
        }
      });
  }

  const selectLesson = async (lesson: LessonNew) => {
    setSelectedLesson(lesson);
    if(!user) {
      setLessonState(LessonStates.Login)
      return
    }

    const resonse = user && await requestAccesToVideo(user.uid, lesson.song.title);
    
    if(resonse && resonse.status === 'Allowed') {
      loadLesson(lesson);
    } else if(resonse &&  resonse.status === 'NotBought') {
      setLessonState(LessonStates.Buy)
    } else {
      setLessonState(LessonStates.Error) 
    }
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
              <LessonMenuContainer selectLesson={selectLesson} lessonData={filterLessons(lessonData, activeFilters)}/> :
              <ClassRoom
                lessonState={lessonState}
                selectedLesson={selectedLesson}
                selectedLessonSource={selectedLessonSource}
                signInWithGoogle={signInWithGoogle}
                buyLesson={ async () => {
                  if(selectedLesson && user) {
                    await buyLesson(user.uid, selectedLesson.song.title, setUserInfo)
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
