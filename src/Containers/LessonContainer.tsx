import React from 'react';
import { ClassRoom } from '../Components/ClassRoom/ClassRoom';
import { populateCategories } from './categoryHelpers';
import { lessonsSet, MusicTypes, LessonNew } from './lessons';
import { storage } from '../firebaseConfig';
import { Source, VideoSourceType } from 'react-video-play';
import { SideMenu } from '../Components/SideMenu/SideMenu';
import './LessonContainer.css';

enum LessonStates {
  Play = 'Play',
  Login = 'Login',
  Error = 'Error',
  Buy = 'Buy',
  NotSelected = 'Not Selected'
}

interface LessonContainerProps {
user: firebase.User | undefined
}

interface LessonContainerState {
  selectedLesson?: LessonNew;
  selectedLessonSource?: Source [];
}

export class LessonContainer extends React.Component<LessonContainerProps, LessonContainerState>  {
  constructor(props: LessonContainerProps) {
    super(props);
    this.state = {
      selectedLesson: undefined,
      selectedLessonSource: undefined,
    };
  }
  selectLesson = (lesson: LessonNew) => {
    this.setState({ selectedLesson: lesson });


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
  this.setState({ selectedLessonSource: selectedLessonSource })
    }));
  };


  render() {
    const {
      selectedLesson,
      selectedLessonSource, 
    } = this.state;
    return (
      <div className="LessonContainer-Wrapper">
        <SideMenu selectLesson={this.selectLesson} categories={populateCategories(Object.keys(MusicTypes),lessonsSet)} />
        <ClassRoom
          lessonState={LessonStates.Play}
          selectedLesson={selectedLesson}
          selectedLessonSource={selectedLessonSource}
        />
      </div>
    )
  }
};
