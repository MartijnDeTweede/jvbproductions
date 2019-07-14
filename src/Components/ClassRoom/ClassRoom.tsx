import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu';
import { Lesson, Category } from '../SideMenu/SideMenu.types';
import {ReactVideoPlay, VideoSourceType} from 'react-video-play';
import './ClassRoom.css';
import '../../../node_modules/react-video-play/public/css/react-video-play.css'
interface ClassRoomProps {
  categories: Category[];
  content: string;
}

interface classRoomState {
  selectedLesson?: Lesson;
}
const src = [
  {
      name: '1080p',
      source: [{
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
          type: VideoSourceType.video_mp4
      }, {
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
          type: VideoSourceType.video_webm
      }, {
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
          type: VideoSourceType.video_ogg
      }]
  }, {
      name: '720p',
      default: true,
      source: [{
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
          type: VideoSourceType.video_mp4
      }, {
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
          type: VideoSourceType.video_webm
      }, {
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
          type: VideoSourceType.video_ogg
      }, {
          source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.m4v',
          type: VideoSourceType.video_mp4
      }]
   }
];

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
    };
  }
  selectLesson = (lesson: Lesson) => {
    this.setState({ selectedLesson: lesson });
  };

  render() {
    const { categories, content } = this.props;
    const { selectedLesson } = this.state;
    return (
      <div className="ClassRoom-Wrapper">
        <SideMenu selectLesson={this.selectLesson} categories={categories} />
        <div>{content}</div>
        {selectedLesson ? (
          <div>
            <span>Liedje: {selectedLesson.name}</span>
            <span>Artiest: {selectedLesson.name}</span>
            <ReactVideoPlay
              sources={src}
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
