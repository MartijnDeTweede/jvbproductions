import React, {useState, useEffect, useCallback} from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { populateCategories } from './categoryHelpers';
import {  MusicTypes, LessonNew } from './lessons';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import { SideMenu } from '../Components/SideMenu/SideMenu';
import './LessonContainer.css';
import { requestAccesToVideo, getAllLessons, buyLessonAccess } from '../Helpers/ApiHelpers';
import { UserInfo } from '../Components/userInfo.types';

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
  console.log('userInfo: ', userInfo);
  updateUserInfo(userInfo);
}

const getAllData = async () =>{
  //  const lessonData = await getAllLessons();
   console.log('lessonData: ');
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
      <div className="LessonContainer-Wrapper">
        <SideMenu selectLesson={selectLesson} categories={populateCategories(Object.keys(MusicTypes),lessonData)} />
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
    )
};
