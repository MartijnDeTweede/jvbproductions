import React from 'react';
import {ReactVideoPlay, Source} from 'react-video-play';
import './ClassRoom.css';
import '../../../node_modules/react-video-play/public/css/react-video-play.css'
import { LessonNew } from '../../Containers/lessons';

interface ClassRoomProps {
  selectedLesson?: LessonNew;
  selectedLessonSource?: Source [];
  lessonState: string;
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

export class ClassRoom extends React.Component<ClassRoomProps> {
  render() {
    const { selectedLesson, selectedLessonSource } = this.props;
    return (
      <div>
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
