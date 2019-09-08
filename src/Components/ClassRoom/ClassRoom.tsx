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
  buyLesson: () => Promise<void>;
}

enum MessageType {
  Warning = 'Warning',
  Error = "Error"
}

export const Message: React.FC<{message: string, messageType: MessageType}> = ({message, messageType}) => (
      <div className={`ClassRoom__Message-Holder ClassRoom__Message-Holder--${messageType} ClassRoom__Message`}>
    {message}
  </div>
)
export class ClassRoom extends React.Component<ClassRoomProps> {
  render() {
    const {
      selectedLesson,
      selectedLessonSource,
      lessonState,
      signInWithGoogle,
      buyLesson
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
        {lessonState === LessonStates.NotSelected && <Message message="Je hebt nog geen les geselecteerd" messageType={MessageType.Warning} />}
        {lessonState === LessonStates.Error && <Message message="Er is iets mis gegaan, ververs de pagina of neem contact op met ons." messageType={MessageType.Error} />}
        {lessonState === LessonStates.Login &&
        <div>
          <Message message="Je moet inloggen om deze les te kunnen volgen." messageType={MessageType.Error} />
          <button className="ClassRoom--Button" onClick={signInWithGoogle}>
            Login met Google
          </button>
        </div>
        }
        {lessonState === LessonStates.Buy &&
        <div>
          <Message message="Je moet deze les kopen om hem te kunnen volgen." messageType={MessageType.Error}/>
          <button className="ClassRoom--Button" onClick={() => buyLesson() }>
            Nu kopen
          </button>
        </div>
        }
      </div>
    );
  }
}
