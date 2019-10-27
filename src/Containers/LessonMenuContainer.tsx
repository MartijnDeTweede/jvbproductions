import React from 'react';
import { LessonNew } from './lessons';
import { LessonTile } from '../Components/Tile/TileLesson';
import "./LessonMenuContainer.css";
import { Exercise } from './excersise';
import { ExerciseTile } from '../Components/Tile/TileExercise';
import { BackButton } from '../Components/Buttons/Backbutton';

  export const LessonMenuContainer: React.FC<{
    lessonData: LessonNew[];
    exerciseData: Exercise[];
    selectedLesson: LessonNew | undefined;
    selectExercise: (exercise: Exercise) => void;
    selectLesson: (lesson: LessonNew) => void;
    handleBackButton: () => void;
    getImageLink: (imageName: string) => Promise<string | void>;
  }> = ({
    lessonData,
    exerciseData,
    selectedLesson,
    selectExercise,
    selectLesson,
    handleBackButton,
    getImageLink,
  }) => {    
    return (
      <div>
        {
          selectedLesson &&
          <BackButton 
            text="Terug naar lessen"
            onClick={() => handleBackButton()}
          />
        }
        <div className="lessonMenuContainer__Wrapper">
          {
            !selectedLesson ?
            lessonData.map(lesson => (
              <div key={`${lesson.song.artist}-${lesson.song.title}`}>
                <LessonTile lesson={lesson} selectLesson={selectLesson} getImageLink={getImageLink}/>
              </div>
            )) :
              exerciseData.map(exercise => (
                <div key={`${exercise.lessonName}-${exercise.exerciseName}`}>
                  <ExerciseTile exercise={exercise} selectExercise={selectExercise} getImageLink={async (imageName) => {
                    console.log('imageName lessonmenu: ', imageName);
                    const link = await getImageLink(imageName);
                    console.log('link lessonmenu: ', link);
                    return link;
                  }}/>
                </div>
              ))
          }

        </div>
      </div>
    );
  }