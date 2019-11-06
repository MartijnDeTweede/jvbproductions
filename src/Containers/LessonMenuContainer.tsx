import React from 'react';
import { LessonNew } from './lessons';
import { LessonTile } from '../Components/Tile/TileLesson';
import "./LessonMenuContainer.css";
import { Exercise } from './excersise';
import { ExerciseTile } from '../Components/Tile/TileExercise';
import { Button, ButtonColors } from '../Components/Buttons/Button';

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
          <Button 
            text="Terug naar Paketten"
            onClick={() => handleBackButton()}
            colour={ButtonColors.gray}
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
                  <ExerciseTile exercise={exercise} selectExercise={selectExercise} getImageLink={getImageLink}/>
                </div>
              ))
          }

        </div>
      </div>
    );
  }