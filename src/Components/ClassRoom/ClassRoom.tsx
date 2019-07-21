import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu';
import { Category } from '../SideMenu/SideMenu.types';
import {ReactVideoPlay, VideoSourceType, Source} from 'react-video-play';
import './ClassRoom.css';
import '../../../node_modules/react-video-play/public/css/react-video-play.css'
import { LessonNew } from '../../Containers/lessons';
import { storage } from '../../firebaseConfig';


interface ClassRoomProps {
  categories: Category[] ;
  content: string;
}

interface classRoomState {
  selectedLesson?: LessonNew;
  selectedLessonSource?: Source [];
}

const slides = [
  {
      img: "http://lorempixel.com/100/75/people/",
      link: "http://video.egorov.pw",
  },
  {
      img: "http://lorempixel.com/100/75/city/",
      link: "http://video.egorov.pw",
  }
]

export class ClassRoom extends React.Component<ClassRoomProps, classRoomState> {
  constructor(props: ClassRoomProps) {
    super(props);
    this.state = {
      selectedLesson: undefined,
      selectedLessonSource: undefined,
    };
  }
  selectLesson = (lesson: LessonNew) => {
    this.setState({ selectedLesson: lesson });


console.log('storage: ', storage);
storage.child(lesson.src).getDownloadURL().then((link => {
  console.log('result: ', link);
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
    const { categories, content } = this.props;
    const { selectedLesson, selectedLessonSource } = this.state;
    return (
      <div className="ClassRoom-Wrapper">
        <SideMenu selectLesson={this.selectLesson} categories={categories} />
        <div>{content}</div>
        {selectedLesson && selectedLessonSource ? (
          <div>
            <span>Song: {selectedLesson.song.title}</span>
            <span>Artiest: {selectedLesson.song.artist}</span>
            <ReactVideoPlay
              sources={selectedLessonSource}
              poster="http://lorempixel.com/900/450/people/"
              enableSlider={true}
              sliderSlides={slides}
              autoplay={true}
              muted={true}
    />
          </div>
        ) : (
          <div>
            <span>selecteer een les</span>
          </div>
        )}
      </div>
    );
  }
}
