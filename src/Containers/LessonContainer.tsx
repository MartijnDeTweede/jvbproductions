import React, {useState, useEffect, useCallback} from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import {  LessonNew } from './lessons';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import './LessonContainer.css';
import { requestAccesToVideo, getAllLessons, buyLessonAccess } from '../Helpers/ApiHelpers';
import { UserInfo } from '../Components/userInfo.types';
import { SideMenuContainer } from './SideMenuContainer';
import classNames from 'classnames';

export enum LessonStates {
  Play = 'Play',
  Login = 'Login',
  Error = 'Error',
  Buy = 'Buy',
  NotSelected = 'Not Selected'
}

export const buyLesson = async (
  userId: string, 
  lessonName: string,
  updateUserInfo: (userInfo: UserInfo) => void) =>{
  const userInfo = await buyLessonAccess(userId, lessonName);
  updateUserInfo(userInfo);
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
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);


  const getAllData = useCallback(async () => {
   const lessonData = await getAllLessons();
    setLessonData(lessonData);;
  },[])

  useEffect(() =>{
    getAllData();
  }, [getAllData])



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
        <div onClick={() => setOpenSideMenu(!openSideMenu)} className="LessonContainer__showSideMenuButton">
          {openSideMenu ? 'menu sluiten' : 'Menu openen'} 
        </div>
      <div className="LessonContainer-Wrapper">
        <div className={classNames({
          "LessonContainer__child": !openSideMenu
        })}>
          <SideMenuContainer selectLesson={selectLesson} lessonData={lessonData} />
        </div>
        <div className={classNames({
          "LessonContainer__child": openSideMenu
        })}>
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
        </div>
      </div>        
      </div>

    )
};
