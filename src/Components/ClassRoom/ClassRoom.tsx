import React from 'react';
import {ReactVideoPlay, Source} from 'react-video-play';
import './ClassRoom.css';
import '../../../node_modules/react-video-play/public/css/react-video-play.css'
import { LessonNew } from '../../Containers/lessons';
import { LessonStates } from '../../Containers/LessonContainer';

interface ClassRoomProps {
  selectedLesson?: LessonNew;
  selectedLessonSource?: Source [];
  lessonState: string;
  signInWithGoogle: () => void;
}

export class ClassRoom extends React.Component<ClassRoomProps> {
  render() {
    const {
      selectedLesson,
      selectedLessonSource,
      lessonState,
      signInWithGoogle
    } = this.props;
    return (
      <div className="Classroom__StateHolder">
        {lessonState === LessonStates.Play && selectedLesson && selectedLessonSource &&
          <div className="ClassRoom__Play">
            <ReactVideoPlay
              sources={selectedLessonSource}
              poster="http://lorempixel.com/900/450/people/"
              enableSlider={true}
              autoplay={true}
              muted={true}
            />
            <div className="ClassRoom__SongInfoPanel">
            <span className="ClassRoom__SongInfo">{selectedLesson.song.title} - {selectedLesson.song.artist}</span>
            </div>
          </div>
        }
        {lessonState === LessonStates.NotSelected && <div className="ClassRoom__MessageHolder ClassRoom__Message"> Selecteer een les </div>}
        {lessonState === LessonStates.Error && <div className="ClassRoom__MessageHolder ClassRoom__Message"> Er is iets mis gegaan, probeer de pagina te refreshen</div>}
        {lessonState === LessonStates.Login &&
        <div>
          <div className="ClassRoom__MessageHolder ClassRoom__Message"> Je moet inloggen om deze les te kunnen zien</div>
          <button className="ClassRoom--Button" onClick={signInWithGoogle}>
            Login met Google
          </button>
        </div>
        }
        {lessonState === LessonStates.Buy && <div className="ClassRoom__MessageHolder ClassRoom__Message">
        <div>
          <div className="ClassRoom__MessageHolder ClassRoom__Message"> Je moet inloggen kopen om hem te kunnen volgen</div>
          <button className="ClassRoom--Button" onClick={() => {console.log('buy clicked')}}>
            Nu kopen
          </button>
        </div>
        </div>}
      </div>
    );
  }
}
