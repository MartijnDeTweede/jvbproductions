import React, { useState } from 'react';
import { LessonNew } from './lessons';
import { LessonTile } from '../Components/Tile/TileLesson';
import "./LessonMenuContainer.css";
import { Exercise } from './excersise';
import { ExerciseTile } from '../Components/Tile/TileExercise';

  export const LessonMenuContainer: React.FC<{
    lessonData: LessonNew[];
    exerciseData: Exercise[];
    selectedLesson: LessonNew | undefined;
    selectExercise: (exercise: Exercise) => void;
    selectLesson: (lesson: LessonNew) => void;
    handleBackButton: () => void;
  }> = ({
    lessonData,
    exerciseData,
    selectedLesson,
    selectExercise,
    selectLesson,
    handleBackButton,
  }) => {    
    return (
      <div>
                  {
            selectedLesson &&
            <button className="lessonMenu--Button" onClick={() => handleBackButton() }>
              Terug naar lessen
            </button>
          }
        <div className="lessonMenuContainer__Wrapper">
          {
            !selectedLesson ?
            lessonData.map(lesson => (
              <div key={`${lesson.song.artist}-${lesson.song.title}`}>
                <LessonTile lesson={lesson} selectLesson={selectLesson} />
              </div>
            )) :
              exerciseData.map(exercise => (
                <div key={`${exercise.lessonName}-${exercise.exerciseName}`}>
                  <ExerciseTile exercise={exercise} selectExercise={selectExercise} />
                </div>
              ))
          }

        </div>
      </div>
    );
  }