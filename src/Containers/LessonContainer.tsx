import React from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { populateCategories } from './categoryHelpers';
import { lessonsSet, MusicTypes, LessonNew } from './lessons';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import { SideMenu } from '../Components/SideMenu/SideMenu';
import './LessonContainer.css';
import { requestAccesToVideo } from '../Helpers/ApiHelpers';

export enum LessonStates {
  Play = 'Play',
  Login = 'Login',
  Error = 'Error',
  Buy = 'Buy',
  NotSelected = 'Not Selected'
}

interface LessonContainerProps {
user: firebase.User | undefined
signInWithGoogle: () => void
}

interface LessonContainerState {
  selectedLesson?: LessonNew;
  selectedLessonSource?: Source [];
  lessonState: LessonStates;
}

export class LessonContainer extends React.Component<LessonContainerProps, LessonContainerState>  {
  constructor(props: LessonContainerProps) {
    super(props);
    this.state = {
      selectedLesson: undefined,
      selectedLessonSource: undefined,
      lessonState: LessonStates.NotSelected,
    };

  }

  loadLesson = (lesson: LessonNew) => {
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
      this.setState({
        selectedLessonSource: selectedLessonSource,
        lessonState: LessonStates.Play,
      })
      })).catch((error) =>{
        if(error.code === "storage/unauthorized") {
          this.setState({
            lessonState: LessonStates.Login,
          })
        } else {
          this.setState({
            lessonState: LessonStates.Error,
          })
        }
      });


  }

  selectLesson = async (lesson: LessonNew) => {
    this.setState({ selectedLesson: lesson });
    
    const {user } = this.props;
    if(!user) {
      this.setState({
        lessonState: LessonStates.Login,
      })
      return;
    }

    const resonse = user && await requestAccesToVideo(user.uid, lesson.song.title);
    console.log('resonse: ', resonse);
    
    if(resonse && resonse.status === 'Allowed') {
      this.loadLesson(lesson);
    } else if(resonse &&  resonse.status === 'NotBought') {
      this.setState({
        lessonState: LessonStates.Buy,
      }) 
    } else {
      this.setState({
        lessonState: LessonStates.Error,
      }) 
    }
  };


  render() {
    const {
      selectedLesson,
      selectedLessonSource, 
      lessonState
    } = this.state;

    const {
      signInWithGoogle
    } = this.props;
    return (
      <div className="LessonContainer-Wrapper">
        <SideMenu selectLesson={this.selectLesson} categories={populateCategories(Object.keys(MusicTypes),lessonsSet)} />
        <ClassRoom
          lessonState={lessonState}
          selectedLesson={selectedLesson}
          selectedLessonSource={selectedLessonSource}
          signInWithGoogle={signInWithGoogle}
        />
      </div>
    )
  }
};
